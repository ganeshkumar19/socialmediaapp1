import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import {format} from 'date-fns'
import api from './api/posts'
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";


function App() {
  const[posts,setPosts]= useState([])
  const[search, setSearch]= useState('')
  const[searchresults, setSearchResults]= useState([])
  const[postTitle, setPostTitle]= useState('')
  const[postBody,setPostBody]= useState('')
  const[editTitle, setEditTitle]= useState('')
  const[editBody,setEditBody]= useState('')
  const navigate = useNavigate()
  const{width} = useWindowSize()

  useEffect(()=>{
    const fetchposts = async()=> {
    try{
      const resposne= await api.get("/posts")
      setPosts(resposne.data)
    }
    catch(err){
      if(err.resposne){
        console.log(err.resposne.data)
        console.log(err.resposne.status)
        console.log(err.resposne.headers)
      }
      else{
        console.log(err.message)
      }
    }
  }
  fetchposts();
  },[])
  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse())
  },[posts, search])

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1:1
    const datetime= format(new Date(), 'MMMM dd, yyyy pp')
    const newposts={id, title:postTitle, datetime, body:postBody}
    try{
      const response = await api.post("/posts", newposts)
      const allposts=[...posts, response.data]
      setPosts(allposts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
   } catch(err){
    if(err.resposne){
      console.log(err.resposne.data)
      console.log(err.resposne.status)
      console.log(err.resposne.headers)
    }
    else{
      console.log(err.message)
    }
  }

  }
  const handleDelete = async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
      const postlist = posts.filter((post)=> post.id !== id)
      setPosts(postlist)
      navigate('/')
    } catch(err){
      if(err.resposne){
        console.log(err.resposne.data)
        console.log(err.resposne.status)
        console.log(err.resposne.headers)
      }
      else{
        console.log(err.message)
      }
    }
    
  }

  const handleEdit= async(id)=>{
    const datetime= format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPosts={id, title:editTitle, datetime, body:editBody}
    try {
      const response= await api.put(`/posts/${id}`, updatedPosts)
      setPosts(posts.map(post=>post.id === id ?{...response.data}: post))
      setEditTitle('')
      setEditBody('') 
      navigate('/')
    } catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className="App">
      <Header title= "GK social media" width={width}/>
      <Nav search={search}
           setSearch={setSearch}/>
    <Routes>
      <Route path="/" element={<Home posts={searchresults}/>}/>
      
      <Route path="post">
      <Route index element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />} />
      <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
      </Route>
      <Route path="/edit/:id" element={<EditPost posts={posts} editTitle={editTitle} editBody={editBody} setEditBody={setEditBody} setEditTitle={setEditTitle} handleEdit={handleEdit} />} />

      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<Missing/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
