// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
/**
 * @title Twitter Contract
 * @dev Store & retrieve value in a variable
 */
contract TwContract {

    event WriteTweet(address recipient, uint twID);
    event UpdateTweet(address recipient, uint tweetsId, bool isDeleted);
    event DeleteTweet(uint twID, bool isDeleted);

    struct Tweet {
        uint id;
        address username;
        string twText;
        bool isDeleted;
    }

    Tweet[] private tweets;

    mapping(uint256 => address) tweetToOwner;

    // Method to be called by our frontend when trying to add a new Tweet
    function _addTweet(string memory _twText, bool _isDeleted) external {
        uint twID = tweets.length;
        tweets.push(Tweet(twID, msg.sender, _twText, _isDeleted));
        tweetToOwner[twID] = msg.sender;
        emit WriteTweet(msg.sender, twID);
    }

    function _getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function _getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

function _updateTweet(uint256 _twID, string memory _newText, bool _isDeleted) external {
        if (tweetToOwner[_twID] == msg.sender) {
            uint256 newTweetId = tweets.length;
            tweets[_twID].isDeleted = true;
            tweets.push(
                Tweet(newTweetId, msg.sender, _newText, _isDeleted)
            );
            tweetToOwner[newTweetId] = msg.sender;

            emit UpdateTweet(msg.sender, _twID, _isDeleted);
        }
    }

    function _deleteTweet(uint _twID, bool _isDeleted) external {
        if(tweetToOwner[_twID] == msg.sender) {
            tweets[_twID].isDeleted = _isDeleted;
            emit DeleteTweet(_twID, _isDeleted);
        }
    }

}