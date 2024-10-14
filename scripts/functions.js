const hardhat = require("hardhat");

async function main() {
    try {
        const [owner, otherSigner] = await hardhat.ethers.getSigners();

        const erc20Address = "0x573e3B75A429325aaCaC1DAea37BD91b7CBD36D4";
        const erc721Address = "0x5d82547842b035186b686be7b7b37FFecD8E3e20";
        const erc1155Address = "0x5E3efE5401A9f1551A5E2CFAc9ca76Fb1fBEb6cC";

        const erc20Token = await hardhat.ethers.getContractFactory("MyERC20Token");
        const erc20 = await erc20Token.attach(erc20Address);

        const erc721Token = await hardhat.ethers.getContractFactory("MyERC721Token");
        const erc721 = await erc721Token.attach(erc721Address);

        const erc1155Token = await hardhat.ethers.getContractFactory("MyERC1155Token");
        const erc1155 = await erc1155Token.attach(erc1155Address);

        const erc20Transfers = await erc20.queryFilter("Transfer");
        console.log("ERC20 Transfer Events:");
        console.log(erc20Transfers);

        const erc721Transfers = await erc721.queryFilter("Transfer");
        console.log("ERC721 Transfer Events:");
        console.log(erc721Transfers);

        const erc1155TransferSingle = await erc1155.queryFilter("TransferSingle");
        console.log("ERC1155 TransferSingle Events:");
        console.log(erc1155TransferSingle);

        const erc1155TransferBatch = await erc1155.queryFilter("TransferBatch");
        console.log("ERC1155 TransferBatch Events:");
        console.log(erc1155TransferBatch);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
