export const paraRequiredValidator = (content,setImageAlert) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = doc.getElementsByTagName('p');
    
    let paraLength=0;
    let parasize=0;
    if (paragraphs.length > 0) {
       for(var i=0;i<paragraphs.length;i++){
        paraLength +=paragraphs[i].textContent.length
        parasize+=paragraphs[i].textContent.trim().length
       }

       if(parasize<=700){
        setImageAlert({showAlert:true,alertText:"You Must Have To Write Minimum 1000 Characters !"})
        return false
       }

       else if(paraLength<=1000){
        setImageAlert({showAlert:true,alertText:"You Must Have To Write Minimum 1000 Characters !"})
        return false
       }
       //max length 25000
       else if(paraLength>=25000){
        setImageAlert({showAlert:true,alertText:"Size Exceeded ! You Can Write Maximum 25000 Characters !"})
        return false
       }
      else {
        return true;
      }
    }else{
       setImageAlert({showAlert:true,alertText:"Blog cannot Be Empty !"})
        return false
    }
  };

  
  export const imgRequiredValidator=(content)=>{
    const html = content;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const img = tempElement.querySelector('img');
        if(img){
            return true;
        }else{
            return false;
        }
  }