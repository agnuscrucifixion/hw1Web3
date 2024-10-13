const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const ERC20Token = await ethers.getContractFactory("MyToken");
    const erc20 = await ERC20Token.deploy(1000000);
    console.log("ERC20 deployed to:", erc20.address);

    const ERC721Token = await ethers.getContractFactory("MyNFT");
    const erc721 = await ERC721Token.deploy();
    console.log("ERC721 deployed to:", erc721.address);

    // Деплой ERC1155
    const ERC1155Token = await ethers.getContractFactory("MyMultiToken");
    const erc1155 = await ERC1155Token.deploy();
    console.log("ERC1155 deployed to:", erc1155.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
