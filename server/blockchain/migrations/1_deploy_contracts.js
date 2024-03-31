const DivisibleNFTs = artifacts.require("DivisibleNFTs");
// const Validation = artifacts.require("Validation");
// const Tracking = artifacts.require("Tracking");

module.exports = function(deployer) {
  deployer.deploy(DivisibleNFTs,  { from: '0xA61849D17a044B743605F150E6c205C08254F29E', value: "240000000000000" });
};
