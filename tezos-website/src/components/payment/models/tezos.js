// models/tezos.js

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

// Initialize Tezos Toolkit
const Tezos = new TezosToolkit('https://ghostnet.smartpy.io'); // Tezos testnet RPC

// Set up signer using environment variable
Tezos.setProvider({
  signer: new InMemorySigner(process.env.TEZOS_PRIVATE_KEY),
});

const sendTestXTZ = async (recipientAddress, amountXTZ) => {
  try {
    const operation = await Tezos.wallet
      .transfer({
        to: recipientAddress, // Use the recipientAddress parameter
        amount: amountXTZ,
      })
      .send();

    await operation.confirmation();
    console.log('Test XTZ sent successfully:', operation.opHash);
    return operation;
  } catch (error) {
    console.error('Error sending test XTZ:', error);
    throw error; // Rethrow error to be caught in the calling function
  }
};

module.exports = { sendTestXTZ };
