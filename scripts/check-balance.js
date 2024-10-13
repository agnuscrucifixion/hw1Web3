const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`Balance of ${deployer.address}: ${balance} MATIC`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
