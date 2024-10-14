async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const ERC20 = await ethers.getContractFactory("MyERC20Token");
    const erc20 = await ERC20.deploy();
    await erc20.waitForDeployment(); // Ждем завершения деплоя
    console.log("ERC20 contract deployed to:", await erc20.getAddress());

    const ERC721 = await ethers.getContractFactory("MyERC721Token");
    const erc721 = await ERC721.deploy();
    await erc721.waitForDeployment();
    console.log("ERC721 contract deployed to:", await erc721.getAddress());

    const ERC1155 = await ethers.getContractFactory("MyERC1155Token");
    const erc1155 = await ERC1155.deploy();
    await erc1155.waitForDeployment(); // Ждем завершения деплоя
    console.log("ERC1155 contract deployed to:", await erc1155.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
