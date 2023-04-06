let lastPlayedTabId;
let isPopupOpen = false;
let latestMediaInfo = {};
let lastPlayedMedia = null;

function updateLatestMediaInfo(tab) {
  latestMediaInfo = {
    title: tab.title,
    icon: getIconNameFromUrl(tab.url),
  };
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "media_played") {
    lastPlayedTabId = sender.tab.id;
    lastPlayedMedia = {
      title: sender.tab.title,
      icon: getIconNameFromUrl(sender.tab.url),
    };
  } else if (message.action === "get_latest_media_info") {
    sendResponse(lastPlayedMedia);
  }
});

function getIconNameFromUrl(url) {
  if (url.includes("open.spotify.com")) {
    return "icon_spotify.png";
  } else if (url.includes("www.youtube.com")) {
    return "icon_youtube.png";
  } else if (url.includes("music.youtube.com")) {
    return "icon_ytmusic.png";
  } else if (url.includes("soundcloud.com")) {
    return "icon_soundcloud.png";
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    (tab.url.includes("open.spotify.com") ||
      tab.url.includes("www.youtube.com") ||
      tab.url.includes("music.youtube.com") ||
      tab.url.includes("soundcloud.com"))
  ) {
    if (tab.audible) {
      lastPlayedMedia = {
        title: tab.title,
        icon: getIconForUrl(tab.url),
      };
    } else {
      lastPlayedMedia = {
        title: "No media currently playing",
        icon: "",
      };
    }

    if (isPopupOpen) {
      chrome.runtime.sendMessage({ action: "update_popup" });
    }
  }
});

function getIconForUrl(url) {
  if (url.includes("open.spotify.com")) {
    return "icon_spotify.png";
  } else if (url.includes("www.youtube.com")) {
    return "icon_youtube.png";
  } else if (url.includes("music.youtube.com")) {
    return "icon_ytmusic.png";
  } else if (url.includes("soundcloud.com")) {
    return "icon_soundcloud.png";
  }
}

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup_open_check") {
    isPopupOpen = true;
    port.onDisconnect.addListener(() => {
      isPopupOpen = false;
    });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content_script.js"],
    });
  } catch (error) {
    console.error("Error executing script:", error);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command received: ${command}`);

  let action;
  if (command === "next_song") {
    action = "next";
  } else if (command === "pause_media") {
    action = "playPause";
  } else if (command === "previous_media") {
    action = "previous";
  } else if (command === "find_active_tab") {
    find_active_tab();
    return;
  } else {
    console.log("Unsupported command");
    return;
  }

  const tabs = await chrome.tabs.query({
    url: [
      "*://*.youtube.com/*",
      "*://*.open.spotify.com/*",
      "*://*.music.youtube.com/*",
      "*://*.soundcloud.com/*",
    ],
  });

  const activeTabs = tabs.filter((tab) => tab.active && tab.audible);
  if (activeTabs.length) {
    lastPlayedTabId = activeTabs[0].id;
  }

  if (lastPlayedTabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: lastPlayedTabId },
        files: ["content_script.js"],
      });

      await chrome.tabs.sendMessage(lastPlayedTabId, { action });
    } catch (error) {
      console.error(
        `Error executing script for tab ${lastPlayedTabId}:`,
        error
      );
    }
  } else {
    console.log("No last played tab found.");
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.action) {
    case "media_played":
      lastPlayedTabId = sender.tab.id;
      break;
    case "get_latest_media_info":
      sendResponse(latestMediaInfo);
      break;
    case "update_popup":
      updateCurrentPlaying(latestMediaInfo);
      break;
    default:
      break;
  }
});

function find_active_tab() {
  chrome.windows.getLastFocused(function (win) {
    var possibles = [];

    chrome.tabs.query({}, function (tabs) {
      var currentTab = tabs.find(
        (tab) => tab.active && tab.windowId === win.id && tab.audible
      );
      possibles = tabs.filter((tab) => tab.audible && tab !== currentTab);

      if (possibles.length) {
        var nextTab;
        if (currentTab) {
          nextTab = possibles.find(
            (tab) =>
              tab.windowId === currentTab.windowId &&
              tab.index > currentTab.index
          );
        }
        if (!nextTab) {
          nextTab = possibles[0];
        }
        chrome.tabs.update(nextTab.id, { active: true });
        chrome.windows.update(nextTab.windowId, { focused: true });
      } else if (currentTab) {
        chrome.tabs.update(currentTab.id, { active: true });
        chrome.windows.update(currentTab.windowId, { focused: true });
      }
    });
  });
}
