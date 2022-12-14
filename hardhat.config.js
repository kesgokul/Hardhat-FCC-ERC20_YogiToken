/** @type import('hardhat/config').HardhatUserConfig */
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user1: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    token: "ETH",
    noColors: true,
  },
  mocha: {
    timeout: 300000, // 300 sec
  },
  solidity: "0.8.17",
};
