import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/assets/video.mp4";
import like from "../../assets/assets/like.png";
import dislike from "../../assets/assets/dislike.png";
import share from "../../assets/assets/share.png";
import save from "../../assets/assets/save.png";
import jack from "../../assets/assets/jack.png";
import user_profile from "../../assets/assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
const PlayVideo = () => {

  const { videoId} = useParams()
  const [apidata, setApidata] = useState(null);
  const [channeldata, setChannelData] = useState(null);
  const [commentdata,setCommentData] = useState([])
  console.log(commentdata);

  const fetchvideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((responce) => responce.json())
      .then((data) => setApidata(data.items[0]));
  };

  const fetchOthetData = async () => {
    const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDataUrl)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));


    const commen_url = `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=${videoId}g&key=${API_KEY}`
    await fetch(commen_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  };

  useEffect(() => {
    fetchvideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOthetData();
  }, [apidata]);

  return (
    <div className="play-video">
      {/* <video controls autoPlay muted src={video1}></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apidata ? value_converter(apidata.statistics.viewCount) : "16k"}{" "}
          views &bull;{" "}
          {apidata ? moment(apidata.snippet.publishedAt).fromNow() : ""}{" "}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_converter(apidata.statistics.likeCount) : "155"}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apidata ? value_converter(apidata.statistics.dislikeCount) : "155"}
          </span>
          <span>
            <img src={share} alt="" />
            shared
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channeldata ? channeldata.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : ""}</p>
          <span>{channeldata?value_converter(channeldata.statistics.subscriberCount):''} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apidata
            ? apidata.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apidata ? value_converter(apidata.statistics.commentCount) : "102"}{" "}
          Comments
        </h4>
        {
          commentdata.map((item,index)=>{
            return (
               <div key={index} className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              jack Nicholson <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              repellendus natus sapiente in excepturi error aspernatur nihil
              doloribus, distinctio, quisquam aut consequatur blanditiis,
              voluptas dolor! lorem20
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
            )
          })
        }
        

      </div>
    </div>
  );
};

export default PlayVideo;
