// content.js

chrome.runtime.onMessage.addListener(msg =>{
  console.log(msg.value.y);
  let {x, y} = msg.value;
  console.log(x,y)
  window.scrollTo(x,y)
});
