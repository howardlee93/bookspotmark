// content.js


export const scrollToElement = async ()=>{
    
}




chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectedFunction
    });
  });

