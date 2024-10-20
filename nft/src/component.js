import { ethers } from "ethers";


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const marketplaceAddress = "0xYourMarketplaceContractAddress";

// ABI of the marketplace contract (this is generated during contract deployment)
const marketplaceABI = [
  // Add your contract's ABI here
];

// Create a new contract instance
const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

// Function to mint a new NFT
async function mintNFT(to, tokenId) {
  const tx = await marketplaceContract.mintNFT(to, tokenId);
  await tx.wait();
  console.log(`Minted NFT with tokenId ${tokenId}`);
}

// Function to list an NFT for sale
async function listNFT(tokenId, price) {
  const tx = await marketplaceContract.listNFT(tokenId, ethers.utils.parseEther(price));
  await tx.wait();
  console.log(`Listed NFT with tokenId ${tokenId} for ${price} ETH`);
}

// Function to buy an NFT
async function buyNFT(tokenId, price) {
  const tx = await marketplaceContract.buyNFT(tokenId, { value: ethers.utils.parseEther(price) });
  await tx.wait();
  console.log(`Bought NFT with tokenId ${tokenId}`);
}

// Example of calling the mintNFT function
const tokenId = 1;
const price = "0.1"; // Price in ETH
await mintNFT("0xRecipientAddress", tokenId);
await listNFT(tokenId, price);
await buyNFT(tokenId, price);
