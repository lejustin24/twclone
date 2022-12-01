import React from "react";
import { useState , useEffect } from "react";
import "../css/Block.css";
import profileImage from "../assests/profile-img.png"
import { TwitterContractAddress } from '../configuration.js';
import { ethers } from 'ethers';
import Twitter from '../utilities/TwitterContract.json'


function Block() {

  const [tweetMessage, setTweetMessage] = useState("");

  // add a Tweet

  const _writeTweet = async () => {
    let tweet = {
      'twText': tweetMessage,
      'isDeleted': false
    };

    /**
     * get the signer and add the tweet (contract)
     */

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        )

        let WriteTweetTx = await TwitterContract._writeTweet(tweet.twText, tweet.isDeleted);

        console.log(WriteTweetTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  //send tweet

  const postTheTweet = (e) => {
    e.preventDefault();

    _writeTweet();

    setTweetMessage("");
  };


  return (
    <div className="block">
      <div className="block-container">
        <form>
          <div className="inputDataContainer">
            <img src={profileImage} className="profile-img" alt="profile-img" />
            <div className="">
              <input 
              onChange={(e) => setTweetMessage(e.target.value)}
              value={tweetMessage}
               className="block-tweet-input" 
               placeholder="What's happening?" 
               type="text" />

          

            </div>

          </div>

          <div className="bottom-container">
            

            <button 
            onClick={postTheTweet}
            type="submit"
            className="submit-block-tweet">Tweet</button>

          </div>

        </form>

      </div>


    </div>
  );
}

export default Block;