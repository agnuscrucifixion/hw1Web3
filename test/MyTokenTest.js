const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contracts", function () {
    let erc20, erc721, erc1155;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        const ERC20 = await ethers.getContractFactory("MyERC20Token");
        erc20 = await ERC20.deploy();
        await erc20.waitForDeployment();

        const ERC721 = await ethers.getContractFactory("MyERC721Token");
        erc721 = await ERC721.deploy();
        await erc721.waitForDeployment();

        const ERC1155 = await ethers.getContractFactory("MyERC1155Token");
        erc1155 = await ERC1155.deploy();
        await erc1155.waitForDeployment();
    });


    describe("MyERC20Token", function () {
        it("Should charge a transfer fee", async function () {
            await erc20.connect(user1).buy({ value: ethers.parseEther("1") });

            const initialOwnerBalance = await erc20.balanceOf(owner.address);

            await erc20.connect(user1).transfer(user2.address, ethers.parseEther("50"));

            const user2Balance = await erc20.balanceOf(user2.address);
            const newOwnerBalance = await erc20.balanceOf(owner.address);

            const ownerFee = BigInt(newOwnerBalance) - BigInt(initialOwnerBalance);

            expect(user2Balance).to.equal(ethers.parseEther("49.5"));

            expect(ownerFee).to.equal(BigInt(ethers.parseEther("0.5")));
        });





        it("Should allow transferFrom after approve", async function () {
            await erc20.connect(user1).buy({ value: ethers.parseEther("1") });
            await erc20.connect(user1).approve(user2.address, ethers.parseEther("50"));

            await erc20.connect(user2).transferFrom(user1.address, user2.address, ethers.parseEther("50"));
            const user2Balance = await erc20.balanceOf(user2.address);

            expect(user2Balance).to.equal(ethers.parseEther("49.5"));
        });
    });

    describe("MyERC721Token", function () {
        it("Should allow minting a new NFT", async function () {
            await erc721.connect(user1).createNFT("https://myapi.com/metadata/1.json");
            const tokenURI = await erc721.tokenURI(0);
            expect(tokenURI).to.equal("https://myapi.com/metadata/1.json");
        });

        it("Should allow buying an NFT", async function () {
            await erc721.connect(user1).buy({ value: ethers.parseEther("0.01") });
            expect(await erc721.ownerOf(0)).to.equal(user1.address);
        });
    });

    // === ERC1155 ТЕСТЫ ===
    describe("MyERC1155Token", function () {
        it("Should mint initial tokens for owner", async function () {
            expect(await erc1155.balanceOf(owner.address, 0)).to.equal(100);
        });

        it("Should allow buying tokens", async function () {
            await erc1155.connect(user1).buy(10, { value: ethers.parseEther("0.1") });
            expect(await erc1155.balanceOf(user1.address, 0)).to.equal(10);
        });

        it("Should return correct URI for tokens", async function () {
            const uri = await erc1155.uri(1);
            expect(uri).to.equal("https://ipfs.io/ipfs/QmeZMEcgLg5cz8Qxo5wV6KJW7wD9Pd5ohMeaGbcXoCJcUX/1.json");
        });
    });
});
