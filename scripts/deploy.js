const { ethers } = require("hardhat");
const readline = require("readline");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Badge = await ethers.getContractFactory("Badge");
  // estimate gas
  const deploymentTx = await Badge.getDeployTransaction(deployer.address);
  const estimatedGas = await deployer.estimateGas(deploymentTx);
  const feeData = await ethers.provider.getFeeData();

  const maxFeePerGas = feeData.maxFeePerGas;
  const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;

  const estimatedCost = estimatedGas * maxFeePerGas;

  console.log("\n=== Deployment Cost Estimate ===");
  console.log("Estimated gas:", estimatedGas.toString());
  console.log(
    "Max fee per gas:",
    ethers.formatUnits(maxFeePerGas, "gwei"),
    "gwei"
  );
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Wallet balance:", ethers.formatEther(balance), "POL");
  console.log(
    "Estimated cost:",
    ethers.formatEther(estimatedCost),
    "POL (testnet)"
  );
  // interact with user
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve) => {
    rl.question("Do you want to deploy? (yes/no): ", resolve);
  });

  rl.close();
  if (answer.toLowerCase() !== "yes") {
    console.log("Deployment cancelled.");
    return;
  }

  const badge = await Badge.deploy(deployer.address);
  await badge.waitForDeployment();

  console.log("Contract deployed to:", await badge.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
