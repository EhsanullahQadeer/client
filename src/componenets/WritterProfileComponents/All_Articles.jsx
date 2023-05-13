import React from 'react'
import BlogCard from "../CommonComponents/BlogCard";

export default function All_Articles() {
  return (
    <div className="writerBlogs">

    <div className="writerArticlesFlex">
    <div>
      <BlogCard item={[]} />
      </div>
      <div>
        <button className="activeChip">Active</button>
      </div>
    </div>

    {/* <div className="writerArticlesFlex">
      <BlogCard item={writerProfileContent[1]} />
      <div>
        <button className="pendingChip">Pending</button>
      </div>
    </div>

    <div className="writerArticlesFlex">
      <BlogCard item={writerProfileContent[2]} />
      <div >
        <button className="rejectedChip">Rejected</button>
      </div>
    </div>

    <div className="writerArticlesFlex">
      <BlogCard item={writerProfileContent[3]} />
      <div >
        <button className="rejectedChip">Rejected</button>
      </div>
    </div> */}

  </div>
  )
}
