import smartpy as sp

# Define the contract
class NFTCollateralizedLoan(sp.Contract):
    def __init__(self, nft_contract, interest_rate=5, loan_duration=30 * 24 * 60 * 60):
        self.init(
            loans=sp.big_map(tkey=sp.TAddress, tvalue=sp.TRecord(
                amount=sp.TMutez,
                collateralNFT=sp.TNat,
                loanStartTime=sp.TTimestamp,
                active=sp.TBool)),
            nft_contract=nft_contract,  # Address of the FA2 NFT contract
            owner=sp.test_account("Admin").address,  # Set owner to Admin during initialization
            interest_rate=interest_rate,  # Interest rate (e.g., 5%)
            loan_duration=loan_duration  # Duration of loan in seconds (default 30 days)
        )

    @sp.entry_point
    def request_loan(self, params):
        sp.set_type(params, sp.TRecord(nft_token_id=sp.TNat, loan_amount=sp.TMutez))
        
        borrower = sp.sender
        
        # Ensure the borrower does not have an active loan
        sp.verify(~self.data.loans.contains(borrower), "Borrower already has an active loan.")
        
        # Transfer NFT from borrower to contract as collateral
        transfer_param = sp.record(
            from_=sp.sender,
            txs=[sp.record(
                to_=sp.self_address,
                token_id=params.nft_token_id,
                amount=1
            )]
        )

        # Call the NFT contract's transfer entry point
        c = sp.contract(
            sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(to_=sp.TAddress, token_id=sp.TNat, amount=sp.TNat)))),
            self.data.nft_contract,
            entry_point="transfer"
        ).open_some("NFT transfer entry point not found.")
        
        sp.transfer([transfer_param], sp.mutez(0), c)
        
        # Record the loan details
        self.data.loans[borrower] = sp.record(
            amount=params.loan_amount,
            collateralNFT=params.nft_token_id,
            loanStartTime=sp.now,
            active=True
        )

        # Send loan amount (XTZ) to the borrower
        sp.send(borrower, params.loan_amount)
    
    @sp.entry_point
    def repay_loan(self):
        borrower = sp.sender
        sp.verify(self.data.loans.contains(borrower), "No active loan found.")
        
        loan = self.data.loans[borrower]
        sp.verify(loan.active == True, "Loan is not active.")
        
        # Calculate total repayment (loan + interest)
        interest = sp.split_tokens(loan.amount, self.data.interest_rate, 100)
        total_repayment = loan.amount + interest
        
        # Ensure the borrower sends enough XTZ to cover repayment
        sp.verify(sp.amount >= total_repayment, "Not enough XTZ sent to repay loan.")
        
        # Transfer the NFT collateral back to the borrower
        transfer_back = sp.record(
            from_=sp.self_address,
            txs=[sp.record(
                to_=borrower,
                token_id=loan.collateralNFT,
                amount=1
            )]
        )
        c = sp.contract(
            sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(to_=sp.TAddress, token_id=sp.TNat, amount=sp.TNat)))),
            self.data.nft_contract,
            entry_point="transfer"
        ).open_some("NFT transfer entry point not found.")
        
        sp.transfer([transfer_back], sp.mutez(0), c)
        
        # Mark loan as inactive
        del self.data.loans[borrower]

    @sp.entry_point
    def seize_collateral(self, borrower):
        sp.set_type(borrower, sp.TAddress)
        sp.verify(sp.sender == self.data.owner, "Only the contract owner can seize collateral.")
        
        sp.verify(self.data.loans.contains(borrower), "No active loan for this borrower.")
        
        loan = self.data.loans[borrower]
        sp.verify(loan.active == True, "Loan is not active.")
        
        # Check if loan duration has expired
        sp.verify(sp.now > loan.loanStartTime.add_seconds(self.data.loan_duration), "Loan duration has not expired.")
        
        # Transfer NFT collateral to the contract owner
        transfer_owner = sp.record(
            from_=sp.self_address,
            txs=[sp.record(
                to_=self.data.owner,
                token_id=loan.collateralNFT,
                amount=1
            )]
        )
        c = sp.contract(
            sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(to_=sp.TAddress, token_id=sp.TNat, amount=sp.TNat)))),
            self.data.nft_contract,
            entry_point="transfer"
        ).open_some("NFT transfer entry point not found.")
        
        sp.transfer([transfer_owner], sp.mutez(0), c)
        
        # Mark loan as inactive
        del self.data.loans[borrower]

    @sp.entry_point
    def deposit_funds(self):
        sp.verify(sp.sender == self.data.owner, "Only the owner can deposit funds.")

    @sp.entry_point
    def withdraw_funds(self, params):
        sp.set_type(params, sp.TMutez)
        sp.verify(sp.sender == self.data.owner, "Only the owner can withdraw funds.")
        sp.verify(sp.balance >= params, "Insufficient balance in contract.")
        sp.send(self.data.owner, params)

# Test scenario
@sp.add_test(name="NFT Collateralized Loan Test")
def test():
    scenario = sp.test_scenario()
    
    # NFT Contract Address (mocked in test)
    nft_contract = sp.test_account("NFT_Contract")
    
    # Test accounts
    admin = sp.test_account("Admin")
    borrower = sp.test_account("Borrower")
    
    # Instantiate contract
    loan_contract = NFTCollateralizedLoan(nft_contract.address)
    scenario += loan_contract
    
    # Test: Request a loan by sending an NFT as collateral
    scenario.h2("Loan Request")
    scenario += loan_contract.request_loan(
        nft_token_id=sp.nat(1), 
        loan_amount=sp.mutez(1000000)
    ).run(sender=borrower)  # Setting the sender as borrower
    
    # Test: Borrower repays the loan
    scenario.h2("Repay Loan")
    scenario += loan_contract.repay_loan().run(
        sender=borrower, 
        amount=sp.mutez(1050000)  # Borrower sends the repayment with interest
    )
    
    # Test: Collateral seizure after loan expiration
    scenario.h2("Seize Collateral")
    scenario += loan_contract.seize_collateral(
        borrower.address
    ).run(
        sender=admin, 
        now=sp.timestamp(60 * 60 * 24 * 31)  # Simulating loan duration expiry (31 days later)
    )