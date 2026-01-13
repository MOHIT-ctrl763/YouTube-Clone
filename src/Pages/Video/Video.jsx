import React from 'react'
import './Video.css'
import PlayVideo from '../../Componenet/Playvideo/PlayVideo'
import Recomended from '../../Componenet/Recomended/Recomended'
import { useParams } from 'react-router-dom'
const Video = () => {


  const {videoId,categoryId} = useParams()

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <Recomended categoryId={categoryId} />
    </div>
  )
}

export default Video
