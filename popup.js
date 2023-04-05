document.getElementById('shortcuts-link').onclick = () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
};

chrome.runtime.sendMessage({ action: 'get_current_playing_tab' });
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'current_playing_tab') {
    document.getElementById('current-playing').textContent = message.url;
  }
});