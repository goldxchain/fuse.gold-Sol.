const hre = require("hardhat");

async function main() {
  const threeAddress = '0x45a2c06FF856214ADB390D632077197976F5Cc44';
  const fourAddress = '0x0C93D51e72D9fa58e206353dE2d11842EEd8C29F';
  const FuseG = await ethers.getContractFactory("Q007");
  const fuseG = await FuseG.deploy(threeAddress, fourAddress);

  await fuseG.deployed();

  console.log("Fuse Gold Contract deployed to " + fuseG.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

