// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract TwContract {

    // Event is an inheritable member of a contract. An event is emitted, 
    // it stores the arguments passed in transaction logs.
    // These logs are stored on blockchain and are accessible using address -
    // - of the contract till the contract is present on the blockchain.
    // An event generated is not accessible from within contracts, 
    // not even the one which have created and emitted them.

    event WriteTweet(address recipient, uint twID);
    event UpdateTweet(address recipient, uint tweetsId, bool isDeleted, uint reactions);
    event DeleteTweet(uint twID, bool isDeleted);
    event ReactToTweet(uint twID);

    // structure for Tweet, it holds its id, the user's adress and the text.
    struct Tweet {
        uint id;
        address username;
        string twText;
        bool isDeleted;
        uint reactions;
    }

    Tweet[] private tweets;

    mapping(uint => address) tweetToOwner;


    // msg.sender sender of the message (current call) :)
    // https://medium.com/coinmonks/solidity-who-the-heck-is-msg-sender-de68d3e98454
    
    // called for the frontend side
    function _writeTweet(string memory _twText, bool _isDeleted) external {
        uint twID = tweets.length;
        tweets.push(Tweet(twID, msg.sender, _twText, _isDeleted, 0));
        tweetToOwner[twID] = msg.sender;
        emit WriteTweet(msg.sender, twID);
    }

    // called for the frontend side
    function _fetchAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i = 0 ; i < tweets.length; i++) {
            if(tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // called for the frontend side
    function _fetchUserTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i = 0; i < tweets.length; i++) {
            if(tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // called for the frontend side
    function _updateTweet(uint _twID, string memory _newText, bool _isDeleted, uint _reactions) external {
        if (tweetToOwner[_twID] == msg.sender) {
            uint newTweetId = tweets.length;
            tweets[_twID].isDeleted = true;
            tweets.push(Tweet(newTweetId, msg.sender, _newText, _isDeleted, _reactions));
            tweetToOwner[newTweetId] = msg.sender;
            
            emit UpdateTweet(msg.sender, _twID, _isDeleted, _reactions);
        }
    }
    // called for the frontend side
    function _deleteTweet(uint _twID, bool _isDeleted) external {
        if(tweetToOwner[_twID] == msg.sender) {
            tweets[_twID].isDeleted = _isDeleted;
            emit DeleteTweet(_twID, _isDeleted);
        }
    }

    function _reactToTweet(uint _twID) external {
        tweets[_twID].reactions = tweets[_twID].reactions + 1;
        emit ReactToTweet(_twID);
    }


    function _getReacts(uint _twID) external view returns (uint _reactions){
        return (tweets[_twID].reactions);
    }

}   