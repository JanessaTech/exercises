module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gasPrice: 3000000000
    },
    A: {
      host: "127.0.0.1",
      port: 3545,
      network_id: "*",
      gasPrice: 4000000000
    },
    B: {
      host: "127.0.0.1",
      port: 4545,
      network_id: "*",
      gasPrice: 5000000000
    }
  },
  console: {
    require: "./somePath.js"
  }
};