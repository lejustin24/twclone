const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Contract", function() {
  let Twitter;
  let twitter;
  let owner;
  let _totalTweets;
  let _totalUserTweets;


  const TOTAL_ALLMINUS = 10;
  const TOTAL_USERSPECIFIC = 4;

  beforeEach(async function() {
    Twitter = await ethers.getContractFactory("TwContract");
    [owner, addr1, addr2] = await ethers.getSigners();

    console.log('owner: ' + owner.address, 'addr1: ' + addr1.address, 'addr2:'+ addr2.address)
    twitter = await Twitter.deploy();

    _totalTweets = [];
    _totalUserTweets = [];

    for(let i = 0; i < TOTAL_ALLMINUS; i++) {
      let tweet = {
        'newText': 'text with id:- ' + i,
        'username': addr1,
        'isDeleted': false
      };

      await twitter.connect(addr1)._writeTweet(tweet.newText, tweet.isDeleted);
      _totalTweets.push(tweet);
    }

    for(let i = 0 ; i < TOTAL_USERSPECIFIC; i++) {
      let tweet = {
        'username': owner,
        'newText': 'text with id:- ' + (TOTAL_ALLMINUS+i),
        'isDeleted': false
      };

      await twitter._writeTweet(tweet.newText, tweet.isDeleted);
      _totalTweets.push(tweet);
      _totalUserTweets.push(tweet);
    }
  });

  describe("Write Tweet", function() {
    it("should emit WriteTweet event", async function() {
      let tweet = {
        'newText': 'New Tweet',
        'isDeleted': false
      };

      await expect(await twitter._writeTweet(tweet.newText, tweet.isDeleted)
    ).to.emit(twitter, 'WriteTweet').withArgs(owner.address, TOTAL_ALLMINUS + TOTAL_USERSPECIFIC);
    })
  });

  describe("Fetch All Tweets", function() {
    it("should return the total number of tweets", async function() {
      const tweetsFromChain = await twitter._fetchAllTweets();
      expect(tweetsFromChain.length).to.equal(TOTAL_ALLMINUS+TOTAL_USERSPECIFIC);
    })

    it("should return the total number of specific user's tweets", async function() {
      const myTweetsFromChain = await twitter._fetchUserTweets();
      expect(myTweetsFromChain.length).to.equal(TOTAL_USERSPECIFIC);
    })
  })

  describe('Update Tweet', () => {
    it('should emit UpdateTweet event', async function() {
      const TWEET_ID = 14; // Belongs to the owner
      const TWEET_NEW_TEXT = 'Edit Tweet text';
      const TWEET_DELETED = false;

      await expect(
        twitter.connect(owner.address)._updateTweet(TWEET_ID, TWEET_NEW_TEXT, TWEET_DELETED)
      ).to.emit(
        twitter, 'UpdateTweet'
        ).withArgs(
          owner.address, TWEET_ID, TWEET_DELETED);
    });
  });


  describe("Delete Tweet", function() {
    it("should emit delete tweet event", async function() {
      const TWEET_ID = 0;
      const TWEET_DELETED = true;

      await expect(
        twitter.connect(addr1)._deleteTweet(TWEET_ID, TWEET_DELETED)
      ).to.emit(
        twitter, 'DeleteTweet'
      ).withArgs(
        TWEET_ID, TWEET_DELETED
      );
    })
  })
});