import * as FileSaver from 'file-saver';
let id = 0;
(function () {
  let startBtn = document.querySelector('#list button[data-method="start"]');
  let stopBtn = document.querySelector('#list button[data-method="stop"]');
  startBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      id = tabs[0].id;
      chrome.tabs.sendMessage(id, {
        start: true
      },
      function (msg) {
        console.log("result message:", msg);
      });
    });
  });
  stopBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(id, {
        stop: true
      },
        function (msg) {
          var blob = new Blob([msg], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(blob, `log.txt`);
        });
    });
  });
})();
