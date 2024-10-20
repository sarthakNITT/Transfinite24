import React, { useState } from "react";
import { JsonRpcProvider, Contract, parseEther } from "ethers"; // Adjusted imports
import './App.css'

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
    <div className="AppMain">
      <div className="appLeftBox"></div>
      <div className="appRightBox">
      <div className="AppHeading">NFT Marketplace</div>
      {walletAddress ? (
        <div className="Connect">Connected Wallet: {walletAddress}</div>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}

      <div className="ListNFT">
        <div>List an NFT</div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="ListToken"
        />
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select value={listingType} onChange={(e) => setListingType(e.target.value)}>
          <option value={1}>Fixed Price</option>
          <option value={2}>Auction</option>
        </select>
        {listingType === 2 && (
          <>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </>
        )}
        <button onClick={listNFT}>List NFT</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Buy an NFT</h3>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={buyNFT}>Buy NFT</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Place a Bid on an NFT</h3>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bid Amount in ETH"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <button onClick={placeBid}>Place Bid</button>
      </div>
    </div>
    </div>
  );
};

export default App;
