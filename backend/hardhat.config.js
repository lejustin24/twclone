require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_GOERLI_URL}`, 
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }
  }
};

// we don't upload the .env file since we have our private key inside it. require('dotenv').config()
// so we don't have to worry about our private key >>> process.env.ACCOUNT_PRIVATE_KEY .. 