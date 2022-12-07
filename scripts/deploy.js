const hre = require("hardhat");

async function main() {
const testOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const taxAddress = "0x32Ac66Ea2de678D2edc66486Dc8cc2Aa0Fff82d8";
const feeAddress = "0xDC8F0f1795B99B5cC2B4619C25BA03aF4b6F905C";
const treasuryAddress = "0x47205d12a931255D46f39100f594bA6E749D40B8";
const rewardVault = "0x6d565db17306A8E2c59B7cE7C230505001E9e65f";

//Multi sig
const threeAddress = "0x45a2c06FF856214ADB390D632077197976F5Cc44";
const fourAddress = "0x0C93D51e72D9fa58e206353dE2d11842EEd8C29F";
  const FuseG = await ethers.getContractFactory("FuseG");
  const fuseG = await FuseG.deploy(threeAddress, fourAddress, taxAddress, feeAddress, treasuryAddress);

  await fuseG.deployed();
  console.log(fuseG.owner);

  console.log("Fuse Gold Contract deployed to " + fuseG.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

