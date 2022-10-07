// content.js
chrome.runtime.onMessage.addListener(msg =>{
  console.log(msg.value.line);
  let {line, x, y} = msg.value;
  console.log(line);
  chrome.storage.local.get("content", res =>{
    const {content} = res;
    console.log(content.line);
    let correctUrlObj = content.filter(elem => elem.line === line && elem.url === window.location.href );
    console.log(correctUrlObj);
    if (correctUrlObj.length > 0){
      console.log(x, y);
      window.scroll(x, y)
    }else{
      alert('wrong bookmark');
      return;
    }
  });
});
