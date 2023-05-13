import React from "react";
import { useEffect,useState,useRef } from "react";
export function autoLoadMore(){
    // This Logic is auto reload when Reached to last post
  const [offset, setOffset] = React.useState(0);
  useEffect(() => {
      const onScroll = () => setOffset(window.pageYOffset);
      // clean up code
       window.removeEventListener('scroll', onScroll);
       window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [loadMoreHeight, setloadMoreHeight] = useState()
  const ref = useRef(null)
  useEffect(() => {
    setloadMoreHeight(ref.current.offsetTop)
  })
 
//This is used for pagination || count loading used in backend logic
  const [page ,setPage]=React.useState(1)
  function loadMore(){
    setPage(page+1)
  }
// This is also used with loading logic
  const [reached,setReached]=useState(false)
  if(reached ==false){
    if (offset+700 >= loadMoreHeight){
      setReached(true)
      loadMore()
    }
  }
  return {
     page:page,ref:ref,setReached:setReached,setPage:setPage
  }

}