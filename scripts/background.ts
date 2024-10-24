
const checkChromeObject = (): void => {
  if (chrome && chrome.runtime) {
    // 可以在後台控制台看到訊息
    console.log('Hello! crx-vue-ts background.ts');
  } else {
    console.error('Failed to access Chrome object.');
  }
};

// 每隔 5 秒檢查一次 Chrome 物件
setTimeout(checkChromeObject, 0);

// 接收來自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkChromeObject') {
    checkChromeObject();
    sendResponse({ status: 'Checked' });
  }
});
