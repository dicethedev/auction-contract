import { ethers } from "hardhat";

async function main() {

 let [bidder1, bidder2] = await ethers.getSigners();

const Auction = await ethers.getContractFactory("Auction");
const auction = await Auction.deploy();

await auction.deployed();

//this will send one ether along when deploying
// const bidAmount = ethers.utils.parseEther("0.010");

console.log("Auction contract deployed to this address: ", auction.address);

const createAuction = await auction.auctionAction( 10, bidder2.address);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});

//@dev - note - my contract is deploy to Goerli testnest [0xf483b9065a15ef22947BDcFbFb2Bb77C398512A8]