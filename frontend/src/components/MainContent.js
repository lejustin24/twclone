import React, { useState, useEffect } from "react";
import "../css/MainContent.css";
import BlockPost from "../components/BlockPost";
import Block from "../components/Block";
import FlipMove from "react-flip-move";
import { TwitterContractAddress } from '../configuration.js';
import {ethers} from 'ethers';
import Twitter from '../utilities/TwitterContract.json'


function MainContent() {

  const [posts, setPosts] = useState([]);


  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];

    // converting the tweet into lowercase - Javascript is case sensitive
    for(let i=0; i<allTweets.length; i++) {
      if(allTweets[i].username.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          'id': allTweets[i].twID,
          'tweetText': allTweets[i]._twText,
          'isDeleted': allTweets[i]._isDeleted,
          'reacts': allTweets[i]._reactions,
          'username': allTweets[i].username,
          'personal': true
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          'id': allTweets[i].twID,
          'tweetText': allTweets[i]._twText,
          'isDeleted': allTweets[i]._isDeleted,
          'reacts': allTweets[i]._reactions,
          'username': allTweets[i].username,
          'personal': false
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  }

  const getAllTweets = async() => {
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

        let allTweets = await TwitterContract._fetchAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTweets();
  }, []);

    /**
     * update the tweet
     */
  const updateTweet = post => async () => {
    console.log(post);
    try {
      const { ethereum } = window

      if (ethereum) {
        let updatedText = prompt('Update your tweet', `${post.tweetText}`);
        console.log(updatedText);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let updateTweetTx = await TwitterContract._updateTweet(
          post.id,
          updatedText,
          post._isDeleted
        );
        let allTweets = await TwitterContract._fetchAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log('Error updating the tweet', error);
    }
  };
      /**
     * get number of reactions
     */
  const getReacts = post => async () => {
    console.log(post);
    try {
      const { ethereum } = window

      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let updateTweetTx = await TwitterContract._getReacts(post.id);
        let allTweets = await TwitterContract._fetchAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log('Error updating the tweet', error);
    }
  };

      /**
     * react to the tweet
     */
  const reactToTweet = post => async () => {
    console.log(post);
    try {
      const { ethereum } = window

      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let reactToTweetTx = await TwitterContract._reactToTweet(post.id);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log('Error reacting to the tweet', error);
    }
  };
      /**
     * dekete the tweet
     */
  const deleteTweet = key => async() => {
    console.log(key);

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract._deleteTweet(key, true);
        let allTweets = await TwitterContract._fetchAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  }

    return (
        <div className="main">
 
          <Block/>  
          <FlipMove>
            {
              posts.map((post) =>(
    /**
     * we send the data to parse it with frowardRef
     */
                <BlockPost
                key={post.id}
                nOfReacts={getReacts(post.id)}
                displayName={post.username}
                text={post.tweetText}
                personal={post.personal}
                reactionOnClick={reactToTweet(post)}
                updateOnClick={updateTweet(post)}
                deleteOnClick={deleteTweet(post.id)}
                />

              ))
            }

          </FlipMove>

        </div>
      );
}

export default MainContent;