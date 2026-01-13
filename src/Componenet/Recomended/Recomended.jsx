import React, { useEffect, useState } from "react";
import "./Recomended.css";
import thumbnail1 from "../../assets/assets/thumbnail1.png";
import thumbnail2 from "../../assets/assets/thumbnail2.png";
import thumbnail3 from "../../assets/assets/thumbnail3.png";
import thumbnail4 from "../../assets/assets/thumbnail4.png";
import thumbnail5 from "../../assets/assets/thumbnail5.png";
import thumbnail6 from "../../assets/assets/thumbnail6.png";
import thumbnail7 from "../../assets/assets/thumbnail7.png";
import thumbnail8 from "../../assets/assets/thumbnail8.png";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
const Recomended = ({ categoryId }) => {
  const [apidata, setApidata] = useState([]);
  const fetchdata = async () => {
    const relatedvideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedvideo_url)
      .then((res) => res.json())
      .then((data) => setApidata(data.items));
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="recomended">
      {apidata.map((item, idx) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={idx} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recomended;
