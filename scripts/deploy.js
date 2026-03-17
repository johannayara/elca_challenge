const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Badge = await ethers.getContractFactory("Badge");
  const badge = await Badge.deploy(deployer.address); // initial_owner = you
  await badge.waitForDeployment();

  console.log("Contract deployed to:", await badge.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
