import React from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../TweetOperation";
import Moment from "moment";
import { likeTweet } from "../../redux/asyncActions/TweetAsync";
import { BiGlobe } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import PopInfo from "../PopInfo";
const TweetPostCard = ({ tweet, dispatch, user }) => {
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <div>
          <FiMoreHorizontal
            data-toggle="dropdown"
            className="dropdownIcon"
            id={`#${tweet.id}dropdown`}
            aria-haspopup="true"
            aria-expanded="false"
          />
          <DropDown
            target={`${tweet.id}dropdown`}
            tweet={tweet}
            user={user}
            tweetId={tweet.id}
          />
        </div>
        {tweet.parent ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>
              <Link
                to={`${tweet.author.username}` || ""}
                className="mx-2 side-name"
              >
                {tweet.author.username} retweeted !
              </Link>
            </strong>

            <TweetHasParentOrNot tweet={tweet.myparent} />
          </div>
        ) : (
          <TweetHasParentOrNot tweet={tweet} />
        )}
      </div>
      {tweet.parent ? (
        <TweetOperation
          liked={tweet.myparent.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.myparent.like_count}
          tweet={tweet.myparent}
          bookmark={tweet.myparent.i_bookmarked}
          id={tweet.myparent.id}
          oriId={tweet.id}
          retweet={true}
        />
      ) : (
        <TweetOperation
          liked={tweet.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.like_count}
          tweet={tweet}
          bookmark={tweet.i_bookmarked}
          id={tweet.id}
        />
      )}
    </div>
  );
};

export default TweetPostCard;

const TweetHasParentOrNot = ({ tweet }) => {
  return (
    <>
      <span className="d-flex">
        <span className="add-tweet-image ">
          <Link to={`/${tweet?.author.username}`}>
            <img
              alt="img"
              // for some reason image path is different ..
              //some have http://http://127.0.0.1:8000 while don't
              src={
                tweet?.author.avatar.includes("http://")
                  ? tweet?.author.avatar
                  : `http://127.0.0.1:8000${tweet?.author.avatar}`
              }
              className="rounded-circle author-image "
              width="60px"
              height="60px"
            />
          </Link>
        </span>
        {/* <div id="popup">
          <PopInfo tweet={tweet} />
        </div> */}
        <Link to={`${tweet?.author.username}/tweet/${tweet?.id}`}>
          <div className="tweet-content">
            <span id="hover" className="d-flex">
              {tweet?.author.username}
              <span className="side-name">
                @ {tweet?.author.nickname} |{" "}
                {Moment(tweet?.created).fromNow(true)}
                <span className="mx-2">
                  {tweet?.is_private ? <FaLock /> : <BiGlobe />}
                  {tweet?.isEdited && <span className="mx-2">- Edited</span>}
                </span>
              </span>
            </span>

            <p className="mt-2">
              {tweet?.title} {tweet?.body}
            </p>
            {tweet?.image && (
              <img
                alt="img"
                src={
                  tweet?.image.includes("http://")
                    ? tweet?.image
                    : `http://127.0.0.1:8000${tweet?.image}`
                }
                className="image img"
              />
            )}
          </div>
        </Link>
      </span>
    </>
  );
};