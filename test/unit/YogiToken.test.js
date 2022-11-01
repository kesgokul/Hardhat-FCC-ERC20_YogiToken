const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config");

describe("OurToken Unit Test", function () {
  //Multipler is used to make reading the math easier because of the 18 decimal points
  const multiplier = 10 ** 18;
  let yogiToken, deployer, user1;
  beforeEach(async function () {
    const accounts = await getNamedAccounts();
    deployer = accounts.deployer;
    user1 = accounts.user1;

    await deployments.fixture("all");
    yogiToken = await ethers.getContract("YogiToken", deployer);
  });

  describe("constructor", function () {
    it("was deployed", async () => {
      assert(yogiToken.address);
    });
    it("Should have correct INITIAL_SUPPLY of token ", async () => {
      const totalSupply = await yogiToken.totalSupply();
      assert.equal(totalSupply.toString(), INITIAL_SUPPLY);
    });
    it("deployer mints the total supply", async function () {
      const deployerBalance = await yogiToken.balanceOf(deployer);
      assert.equal(deployerBalance.toString(), INITIAL_SUPPLY);
    });
  });

  describe("transfer", function () {
    it("reverts if to address is 0", async function () {
      await expect(yogiToken.transfer(ethers.constants.AddressZero, 1)).to.be
        .reverted;
    });
    it("reverts if the sender has no balance", async function () {
      const { user1 } = await getNamedAccounts(); //is this not an abstraction of an account.??
      const accounts = await ethers.getSigners();
      const connectedContract = await yogiToken.connect(accounts[1]);
      await expect(connectedContract.transfer(user1, 1)).to.be.reverted;
    });
    it("transfers if all the conditions are met", async function () {
      const { user1 } = await getNamedAccounts();
      await yogiToken.transfer(user1, 2);
      const user1Balance = await yogiToken.balanceOf(user1);
      assert.equal(user1Balance.toString(), "2");
    });
  });

  describe("allowance", function () {
    let user1, userToken;
    const amountAllowed = 5;
    beforeEach(async function () {
      user1 = (await getNamedAccounts()).user1;
      userToken = await ethers.getContract("YogiToken", user1);
    });
    it("unapproved allowance returns 0", async function () {
      const allowance = await yogiToken.allowance(deployer, user1);
      assert.equal(allowance.toString(), "0");
    });

    it("returns the correct approved allowance", async function () {
      await yogiToken.approve(user1, 5);
      const user1Allowance = await yogiToken.allowance(deployer, user1);
      assert.equal(user1Allowance.toString(), "5");
    });

    it("allows the approved allowance to be transfered", async function () {
      await yogiToken.approve(user1, amountAllowed);
      await userToken.transferFrom(deployer, user1, amountAllowed);
      const userBalance = await yogiToken.balanceOf(user1);

      assert.equal(userBalance.toString(), amountAllowed.toString());
    });

    it("reverts if the transfer amount is greater than the allowance", async function () {
      await yogiToken.approve(user1, amountAllowed);
      await expect(userToken.transferFrom(deployer, user1, 6)).to.be.reverted;
    });

    it("reverts if the transfer amount is greater than the balance of the from account", async function () {
      const accounts = await ethers.getSigners();
      const user2Token = await ethers.getContract(
        "YogiToken",
        accounts[2].address
      );
      await yogiToken.transfer(user1, amountAllowed);
      userToken.approve(accounts[2].address, amountAllowed);
      await expect(user2Token.transferFrom(user1, accounts[2].address, 6)).to.be
        .reverted;
    });
  });

  describe("transfer from", function () {
    /**
     * reverts if allowance is not set/ allowance is less than amount
     * reverts if sender has a balance less than the amount to be sent
     *
     */
    it("reverts if the allowance is less than the trannsfer amount", async function () {
      const accounts = await ethers.getSigners();
      const connectedContract = await yogiToken.connect(accounts[1]);
      connected;
    });
  });
});
