// background.js
'use strict';

//connect to local storage


// localStorage.getItem('bookmarks');

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

 getCurrentTab();


 async function getTextContentByClick(e){
    let element = e.target.textContent;

    console.log(element);
 }

 chrome.runtime.onInstalled.addListener('click', () => {
    console.log('clicked')
 });


//  chrome.scripting.executeScript(
//     injection: ScriptInjection,
//     callback?: function,
//   )

//  chrome.window.addEventListener('click',getTextContentByClick );