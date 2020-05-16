import * as rrweb from 'rrweb';
let events = [];
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(msg);
  if (msg.start) {
    rrweb.record({
      emit(event) {
        events.push(event);
      }
    });
    sendResponse('start');
  } else if (msg.stop) {
    sendResponse(JSON.stringify(events));
  }

});

