const {ethers} = require("hardhat");

async function executeMinting() {
    try {
        const ERC721TokenFactory = await ethers.getContractFactory("MyERC721Token");
        const signers = await ethers.getSigners();
        console.log(signers)
        const primaryOwner = signers[0];

        const secondarySigner = signers[1];

        const deployedContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        const contractInstance = await ERC721TokenFactory.attach(deployedContractAddress);

        const mintResult = await contractInstance.safeMint(primaryOwner.address, 200);
        const newTokenOwner = await contractInstance.ownerOf(200);

        console.log("Mint Result:", mintResult);
        console.log("New Token Owner:", newTokenOwner);

        await contractInstance.safeMint(primaryOwner.address, 201);
        await contractInstance.approve(secondarySigner.address, 201);
        await contractInstance.connect(secondarySigner).safeTransferFrom(primaryOwner.address, secondarySigner.address, 201);

    } catch (error) {
        console.error("Error during minting process:", error);
        process.exit(1);
    }
}

executeMinting();
