import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function StoryThumbnails({spons,add ,title,imageUrl,videoUrl,handleStory}) {
  return (
    <div onClick={handleStory} className='storyThumbnailMain'>
    {spons&&<span className='tubnailSpons'>Sponsered</span>}
    {add&&<span className='tubnailSpons'>How Square Add</span>}
    {title&&<p className='px-2'>{title}</p>}
    {imageUrl&& <img className='storyThumbnailImage' src={`http://localhost:5000/uploads/stories/images/${imageUrl}`} alt="thumbnail" /> }
    {videoUrl&&<video id="my-video" className='storyThumbnailImage' src={`http://localhost:5000/uploads/stories/videos/${videoUrl}#t=0.5`} controls preload="metadata" autoPlay={false}>
     Your browser does not support the video tag.
    </video>}
    {videoUrl&& <PlayArrowIcon  className='videoPlayButtonStory position-absolute'/>}

    </div>
  )
}
