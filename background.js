// //service worker
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       if (request.greeting === "googleisopened")
//       {
//           chrome.tabs.getSelected(null, function(tab) 
//           {
//               chrome.tabs.onUpdated.addListener(mylistener);
//               function mylistener (tabId, changeInfo, tab)
//               {
//                   alert(changeInfo.url);
//                   chrome.tabs.onUpdated.removeListener(mylistener);
//               }
//           });
//       }
//   });  