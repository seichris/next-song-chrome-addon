document.getElementById("shortcuts-link").onclick = () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
};

function updateIcon(hostname) {
  let iconName;

  if (hostname.includes("open.spotify.com")) {
    iconName = "icon_spotify.png";
  } else if (hostname.includes("www.youtube.com")) {
    iconName = "icon_youtube.png";
  } else if (hostname.includes("music.youtube.com")) {
    iconName = "icon_ytmusic.png";
  } else if (hostname.includes("soundcloud.com")) {
    iconName = "icon_soundcloud.png";
  }

  if (iconName) {
    document.getElementById("current-icon").src = `icons/${iconName}`;
  }
}

async function updateCurrentPlaying() {
  const tabs = await chrome.tabs.query({
    url: [
      "*://*.youtube.com/*",
      "*://*.open.spotify.com/*",
      "*://*.music.youtube.com/*",
      "*://*.soundcloud.com/*",
    ],
    active: true,
    audible: true,
  });

  if (tabs.length > 0) {
    document.getElementById("current-playing").textContent = tabs[0].title;
    updateIcon(tabs[0].url);
  } else {
    document.getElementById("current-playing").textContent =
      "No media currently playing";
  }
}

updateCurrentPlaying();
