 export default function numberLength(pre,e){
    if(e.target.value >=1000){
        return {
          ...pre,
    [e.target.name]: e.target.value.slice(0,3)
      }
      }
     else if(e.target.value >150){
        return {
          ...pre,
    [e.target.name]: e.target.value.slice(0,2)
      }
    }
    else{
      return {
        ...pre,
  [e.target.name]: e.target.value.slice(0,3)
    }
      }
}