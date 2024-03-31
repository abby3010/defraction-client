const HDWalletProvider = require('@truffle/hdwallet-provider');
// const secret = require('secret')

// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 9545,
//       network_id: "*", // Match any network id
//       gas: 5000000
//     }
//   },
//   contracts_directory: './contracts/',
//   contracts_build_directory: './build/contracts/',
//   compilers: {
//     solc: {
//       version: "^0.8.16", 
//       settings: {
//         optimizer: {
//           enabled: true, // Default: false
//           runs: 200      // Default: 200
//         },
//       }
//     }
//   }
// };
let secret = "crop marble wrist tattoo helmet topple person meat text hobby ability try"
const mnemonic = secret.toString().trim();

module.exports = {
  networks: {
    // development: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: "*", // Match any network id
    //   gas: 5000000
    // }
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.infura.io/v3/aacd62799a1a4b919aa46ce261c790f6`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
        version: "0.8.16",
    }
  }
}
