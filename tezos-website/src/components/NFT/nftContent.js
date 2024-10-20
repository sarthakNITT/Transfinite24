import React, { useState } from "react";
import { JsonRpcProvider, Contract, parseEther } from "ethers"; // Adjusted imports
import './nftContent.css'
import NFTImage from '../../images/NFTNEW.svg'

const marketplaceABI = [/* Paste your marketplace ABI here */];
const marketplaceAddress = "0xYourSmartContractAddress"; // Replace with your contract address

const App = () => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [listingType, setListingType] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Function to connect MetaMask and get the signer
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
