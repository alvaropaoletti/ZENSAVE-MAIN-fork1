const hre = require("hardhat");

async function main() {
  console.log("Desplegando ZenSave en RSK Testnet...");

  const ZenSave = await hre.ethers.getContractFactory("ZenSave");
  const zenSave = await ZenSave.deploy();

  await zenSave.waitForDeployment();

  const address = await zenSave.getAddress();
  console.log("✅ ZenSave desplegado en:", address);
  console.log("Guardá esta dirección, la necesitás en el frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});