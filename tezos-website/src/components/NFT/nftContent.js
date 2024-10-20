import React, { useState } from "react";
import { JsonRpcProvider, Contract, parseEther } from "ethers"; // Adjusted imports
import './nftContent.css'
import NFTImage from '../../images/NFTNEW.svg'

const marketplaceABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			}
		],
		"name": "finalizeAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "enum NFTMarketplace.ListingType",
				"name": "listingType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "listNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "NFTBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum NFTMarketplace.ListingType",
				"name": "listingType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "NFTListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newRoyaltyFee",
				"type": "uint256"
			}
		],
		"name": "updateRoyaltyFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "enum NFTMarketplace.ListingType",
				"name": "listingType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "royaltyFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenCreators",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const marketplaceAddress = "0x21b195e80c1bf0cd111a2b0b6f519276c404857a"; 

const App = () => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [listingType, setListingType] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new JsonRpcProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setSigner(signer);
        setWalletAddress(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask not installed");
    }
  };

  // Function to list an NFT
  const listNFT = async () => {
    if (!signer) return;
    try {
      const marketplaceContract = new Contract(marketplaceAddress, marketplaceABI, signer);
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);
      const tx = await marketplaceContract.listNFT(
        tokenId,
        parseEther(price), // parseEther from ethers.js v6
        listingType,
        startTimestamp,
        endTimestamp
      );
      await tx.wait();
      alert("NFT Listed Successfully!");
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  // Function to buy an NFT
  const buyNFT = async () => {
    if (!signer) return;
    try {
      const marketplaceContract = new Contract(marketplaceAddress, marketplaceABI, signer);
      const tx = await marketplaceContract.buyNFT(tokenId, {
        value: parseEther(price), // parseEther from ethers.js v6
      });
      await tx.wait();
      alert("NFT Bought Successfully!");
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  // Function to place a bid on an NFT
  const placeBid = async () => {
    if (!signer) return;
    try {
      const marketplaceContract = new Contract(marketplaceAddress, marketplaceABI, signer);
      const tx = await marketplaceContract.placeBid(tokenId, {
        value: parseEther(bidAmount), // parseEther from ethers.js v6
      });
      await tx.wait();
      alert("Bid Placed Successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div className="MainBox">
      <div className="RightBox">
      <div className="LoginText">NFT Marketplace</div>
      {walletAddress ? (
        <div className="Connect">Connected Wallet: {walletAddress}</div>
      ) : (
        <button className="AccountBox" onClick={connectWallet}>Connect MetaMask</button>
      )}

      <div className="ListNFT">
        <div className="ListNFTtext">List an NFT</div>
        <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="PasswordNameInput"
        />
        </div>
        <div className="passdrop">
        <input
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="PasswordNameInput1"
          />
          <select className="dropdown" value={listingType} onChange={(e) => setListingType(e.target.value)}>
            <option className="dropdownoption" value={1}>Fixed Price</option>
            <option className="dropdownoption" value={2}>Auction</option>
          </select>
          </div>
        {listingType === 2 && (
          <>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="startDate"
            />
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="endDate"
            />
          </>
        )}
        <button className="AccountBox" onClick={listNFT}>List NFT</button>
      </div>
      
      <div className="ListNFT">
        <div className="ListNFTtext">Buy an NFT</div>
        <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="PasswordNameInput"
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="PasswordNameInput"
        />
        </div>
        <button className="AccountBox" onClick={buyNFT}>Buy NFT</button>
      </div>
      <div className="ListNFT">
        <div className="ListNFTtext">Place a Bid on an NFT</div>
        <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="PasswordNameInput"
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Bid Amount in ETH"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="PasswordNameInput"
        />
        </div>
        <button className="AccountBox" onClick={placeBid}>Place Bid</button>
        </div>
        </div>
    </div>
  );
};

export default App;
