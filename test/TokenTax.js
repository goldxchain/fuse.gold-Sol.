const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } =require("ethers");

//Test wallets
const testOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const taxAddress = "0x32Ac66Ea2de678D2edc66486Dc8cc2Aa0Fff82d8";
const feeAddress = "0xDC8F0f1795B99B5cC2B4619C25BA03aF4b6F905C";
const treasuryAddress = "0x47205d12a931255D46f39100f594bA6E749D40B8";

//Multi sig
const threeRoleAddress = "0x45a2c06FF856214ADB390D632077197976F5Cc44";
const fourRoleAddress = "0x0C93D51e72D9fa58e206353dE2d11842EEd8C29F";


async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const FuseG = await ethers.getContractFactory("Q007");

    const fuseG = await FuseG.deploy(testOwner, testOwner);
    await fuseG.deployed();

    owner = await fuseG.owner();
    console.log("OWNER: " + owner);

	await fuseG.mintTokens(owner, ethers.utils.parseUnits("10", 18));

    return { FuseG, fuseG, owner };
  }

describe("FuseG contract", function () {
	it("Should initialise all wallets", async function () {
	    const { fuseG } = await loadFixture(deployTokenFixture);

	    expect(await fuseG.taxAddress()).to.equal(taxAddress);
	    expect(await fuseG.feeAddress()).to.equal(feeAddress);
	    expect(await fuseG.treasuryAddress()).to.equal(treasuryAddress);
	    expect(await fuseG.threeRoleAddress()).to.equal(testOwner);
	    expect(await fuseG.fourRoleAddress()).to.equal(testOwner);
	    
	});

	it("Should mint 10 tokens", async function () {
		const { fuseG, owner } = await loadFixture(deployTokenFixture);

		expect(await fuseG.balanceOf(owner)).to.equal(ethers.utils.parseUnits("10", 18));
	});

	it("Should not add tax by default", async function () {
		const { fuseG, owner } = await loadFixture(deployTokenFixture);

		await fuseG.transfer(treasuryAddress, ethers.utils.parseUnits("1", 18));

		expect(await fuseG.taxRate()).to.equal(0);
		expect(await fuseG.balanceOf(owner)).to.equal(ethers.utils.parseUnits("9", 18));
		expect(await fuseG.balanceOf(treasuryAddress)).to.equal(ethers.utils.parseUnits("1", 18));
	});

	it("Should send correct tax to tax wallet after setting tax rate", async function () {
		const { fuseG, owner } = await loadFixture(deployTokenFixture);

		const taxRate = 100; //1%
		await fuseG.setTaxRate(taxRate);
		expect(await fuseG.taxRate()).to.equal(taxRate);

		await fuseG.transfer(treasuryAddress, ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(treasuryAddress)).to.equal(ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(owner)).to.equal(ethers.utils.parseUnits("8.99", 18)); //7.99
		expect(await fuseG.balanceOf(taxAddress)).to.equal(ethers.utils.parseUnits("0.01", 18)); //0.01
	});

	it("Should perform 10% tax on specific tax address even if taxRate is 0", async function () {
		const { fuseG, owner } = await loadFixture(deployTokenFixture);

		await fuseG.setTaxRate(0);
		expect(await fuseG.taxRate()).to.equal(0);

		await fuseG.addToTaxList(owner, 1000);
		expect(await fuseG.taxList(owner)).to.equal(1000);
		expect(await fuseG.isSpecificTax(owner)).to.equal(true);

		await fuseG.transfer(treasuryAddress, ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(treasuryAddress)).to.equal(ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(owner)).to.equal(ethers.utils.parseUnits("8.9", 18)); //8.9
		expect(await fuseG.balanceOf(taxAddress)).to.equal(ethers.utils.parseUnits("0.1", 18)) //0.1
	});

	it("Should remove specific wallet from tax list", async function () {
		const { fuseG, owner } = await loadFixture(deployTokenFixture);

		await fuseG.addToTaxList(owner, 1000);
		expect(await fuseG.taxList(owner)).to.equal(1000);
		expect(await fuseG.isSpecificTax(owner)).to.equal(true);

		await fuseG.removeFromTaxList(owner);
		expect(await fuseG.isSpecificTax(owner)).to.equal(false);

		await fuseG.transfer(treasuryAddress, ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(owner)).to.equal(ethers.utils.parseUnits("9", 18));
		expect(await fuseG.balanceOf(treasuryAddress)).to.equal(ethers.utils.parseUnits("1", 18));
		expect(await fuseG.balanceOf(taxAddress)).to.equal(ethers.utils.parseUnits("0", 18)) //0
	});
	
});