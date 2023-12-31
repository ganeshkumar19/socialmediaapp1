import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts, handleDelete}) => {
  const {id} = useParams();
  const post = posts.find((post)=> (post.id).toString() === id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
         <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${post.id}`}><button>Edit post</button></Link>
          <button onClick={()=>(
            handleDelete(post.id)
          )}>Delete Post</button>
         </>
        }
        {!post &&
          <>
            <p>Post not found</p>
            <p>Well that's dissapointing</p>
          </>}
      </article>
    </main>
  )
}

export default PostPage