const hre = require("hardhat");

async function main() {
  const VotingPlatform = await hre.ethers.getContractFactory("VotingPlatform");
  const vote = await VotingPlatform.deploy();

  await vote.deployed();

  console.log(
    `VotingPlatform with 1 ETH deployed to ${vote.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0xBBdc5a4eFb321D4AF4F61451A75423d562D5e5ae