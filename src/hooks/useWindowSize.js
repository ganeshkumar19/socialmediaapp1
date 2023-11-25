import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
  const[windowSize, setWindowSize]= useState({
    width: undefined,
    height: undefined
  })

  useEffect(()=>{
    const handlleResize=()=>{
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  handlleResize();

  window.addEventListener("resize", handlleResize)

  return ()=>window.removeEventListener("resize", handlleResize)
  },[])
  return windowSize;
}

export default useWindowSize