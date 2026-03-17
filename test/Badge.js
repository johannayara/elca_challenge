const { expect } = require('chai');

describe('Badge', function () {
  before(async function () {
    this.Badge = await ethers.getContractFactory('Badge');
  });

  beforeEach(async function () {
    this.badge = await this.badge.deploy();
    await this.badge.waitForDeployment();
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {

    // Store a value
    await this.box.store(42);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.box.retrieve()).toString()).to.equal('42');
  });
});
