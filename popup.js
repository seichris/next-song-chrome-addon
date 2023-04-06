document.getElementById("shortcuts-link").onclick = () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
};

function updateIcon(iconName) {
  document.getElementById("current-icon").src = `icons/${iconName}`;
}

async function updateCurrentPlaying() {
  chrome.runtime.sendMessage({ action: "get_latest_media_info" }, (response) => {
    if (response) {
      document.getElementById("current-playing").textContent = response.title;
      updateIcon(response.icon);
    } else {
      document.getElementById("current-playing").textContent =
        "No media currently playing";
    }
  });
}

updateCurrentPlaying();
