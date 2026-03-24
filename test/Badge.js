const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Badge Contract", function () {
  let badge;
  let owner;
  let recipient;
  let otherUser;

  const TEST_URI = "data:application/json;base64,eyJuYW1lIjoidGVzdCJ9";

  // Deploy a fresh contract before each test
  beforeEach(async function () {
    [owner, recipient, otherUser] = await ethers.getSigners();
    const Badge = await ethers.getContractFactory("Badge");
    badge = await Badge.deploy(owner.address);
    await badge.waitForDeployment();
  });

  // ── Deployment ──
  describe("Deployment", function () {
    it("should have correct name and symbol", async function () {
      expect(await badge.name()).to.equal("Badge");
      expect(await badge.symbol()).to.equal("BADGE");
    });
  });

  // ── Minting ──
  describe("Minting", function () {
    it("should mint a badge and return token ID 1", async function () {
      const tx = await badge.safeMint(recipient.address, TEST_URI);
      await tx.wait();
      // first token ID should be 0
      expect(await badge.ownerOf(1)).to.equal(recipient.address);
    });

    it("should store the correct token URI", async function () {
      await badge.safeMint(recipient.address, TEST_URI);
      expect(await badge.tokenURI(1)).to.equal(TEST_URI);
    });

    it("should increment token IDs on each mint", async function () {
      await badge.safeMint(recipient.address, TEST_URI);
      await badge.safeMint(recipient.address, TEST_URI);
      await badge.safeMint(recipient.address, TEST_URI);

      expect(await badge.ownerOf(1)).to.equal(recipient.address);
      expect(await badge.ownerOf(2)).to.equal(recipient.address);
      expect(await badge.ownerOf(3)).to.equal(recipient.address);
    });

    it("should mint to different recipients", async function () {
      await badge.safeMint(recipient.address, TEST_URI);
      await badge.safeMint(otherUser.address, TEST_URI);

      expect(await badge.ownerOf(1)).to.equal(recipient.address);
      expect(await badge.ownerOf(2)).to.equal(otherUser.address);
    });
  });

  // ── Interface Support ──
  describe("supportsInterface", function () {
    it("should support ERC721 interface", async function () {
      // ERC721 interface ID
      expect(await badge.supportsInterface("0x80ac58cd")).to.equal(true);
    });

    it("should support ERC721Metadata interface", async function () {
      // ERC721Metadata interface ID
      expect(await badge.supportsInterface("0x5b5e139f")).to.equal(true);
    });

    it("should not support a random interface", async function () {
      expect(await badge.supportsInterface("0x12345678")).to.equal(false);
    });
  });
});
