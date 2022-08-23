require("dotenv").config({ path: ".env" });
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const _value = ethers.utils.parseEther("10");

  const CONTRACTADDRESS = "0xf483b9065a15ef22947BDcFbFb2Bb77C398512A8";
  const auction = await ethers.getContractAt("IAuction", CONTRACTADDRESS);

  let [bidder1, bidder2] = await ethers.getSigners();
 
  const createAuction = await auction.auctionAction( 10, bidder2.address);
  console.log("Auction Execution", createAuction);

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  let placeBidder = "0x9ee15CF9EC4B3830bBedA501d85F5329Ea3C595C";
  await helpers.impersonateAccount(placeBidder);
  const impersonatedSigner = await ethers.getSigner(placeBidder);

  const rec = await (await auction.connect(impersonatedSigner).placeBid()).wait();
  console.log(rec, {value: _value} )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
