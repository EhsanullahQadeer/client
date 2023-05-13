
export default function timeToRead(str){
  let words = str?.split(' ').filter(function(n) { return n != '' }).length;
  let time = Math.ceil(words/350);
  return   time + " " +"min. to read"
}
