// content.js


// const getInfo = async()=>{
//   let x, y, url;

//   await chrome.storage.local.get("content", res =>{
//     console.log(res.content);
//     x = res.content.scrollLeft;
//     y = res.content.scrollTop,
//     url = res.content.url
//   })
//   return {x,y, url};
// }

// const scrollToElement = async (x,y)=>{
//   window.scrollTo(x,y);
// }

// const main = async ()=>{
//   const {x,y, url} = await getInfo();

//   //check right url
//   chrome.tabs.onUpdated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//       if (url === current_tab_info.url) {
//         window.scrollTo(x,y);
//       }
//     })
//   });
// }

// main();



let url = window.location.href;
console.log(url);
chrome.storage.local.get("content", res =>{
  const {content} = res;
  console.log(content);
  let correctUrlObj = content.filter(elem => elem.url === url);
  console.log(correctUrlObj);
  const {scrollLeft, scrollTop} = correctUrlObj[0];

  console.log(scrollLeft, scrollTop);
  window.scroll(scrollLeft, scrollTop)
})
