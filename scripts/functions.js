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







        const token20 = await ethers.getContractFactory("MyERC20Token");
        const [ owner20, secondSigner20 ] = await ethers.getSigners();

        const contractAddress20 = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        const contract = await token20.attach(contractAddress20);

        for (let i = 0; i < 10; i++) {
            console.log(await ethers.provider.getStorage(contract, i));
        }
        console.log(await contract.queryFilter("Transfer"));



        await contract.mint(owner20.address, 303);
        await contract.transfer(secondSigner20.address, 404);
        await contract.approve(secondSigner20.address, 404);
        await contract.connect(secondSigner20).transferFrom(owner20.address, secondSigner20.address, 404);
        await contract.buy(secondSigner20.address, {value: 404});

        newOwne20rBalance = await contract.balanceOf(owner20.address);
        balanceNewOther = await contract.balanceOf(secondSigner20.address);

        console.log(newOwne20rBalance);
        console.log(balanceNewOther);

    } catch (error) {
        console.error("Error during minting process:", error);
        process.exit(1);
    }
}

executeMinting();
