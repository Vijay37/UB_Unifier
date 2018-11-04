// This function is called onload in the popup code
// function getPageDetails(callback) { 
    // Inject the content script into the current page 
//     // chrome.tabs.executeScript(null, { file: 'content.js' }); 
//     chrome.tabs.executeScript({file: 'content.js'}); 
//     // Perform the callback when a message is received from the content script
//     chrome.runtime.onMessage.addListener(function(message)  { 
//         // Call the callback function
//         // callback(message); 
//         console.log(message);
//     }); 
// }; 
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
    sendResponse({data: window.getSelection().toString()});
  else
    sendResponse({}); // snub them.
});
