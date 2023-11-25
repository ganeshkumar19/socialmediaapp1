import React from 'react'

const NewPost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>title</label>
        <input
        id="postTitle"
        type='text'
        required
        placeholder='Enter your post'
        value={postTitle}
        onChange={(e)=> setPostTitle(e.target.value)}/>
        <label htmlFor='postBody'>Post Body</label>
        <textarea
        id='postBody'
        required
        value={postBody}
        onChange={(e)=>setPostBody(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>
    </main>
  )
}

export default NewPost