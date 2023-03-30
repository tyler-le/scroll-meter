let tabScrollDistances = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getScrollDistance) {
        const tabId = sender.tab.id;
        const scrollDistance = tabScrollDistances[tabId] || 0;
        sendResponse({ scrollDistance: scrollDistance });
    }

    else if (message.counter) {
        const tabId = sender.tab.id;
        tabScrollDistances[tabId] = message.counter;
        console.log("[Background Script] Scroll distance of tab", tabId, ":", tabScrollDistances[tabId], "pixels");
    }

    else if (message.getActiveTab) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                const tabId = tabs[0].id;
                sendResponse({ tabId: tabId });
            } else {
                sendResponse({ tabId: null });
            }
        });
        return true; // Need to return true to indicate that we will send a response asynchronously
    }
    else if (message.getTotalDistances || message.updatePopup) {
        let totalDistance = 0;
        for (let tabId in tabScrollDistances) {
            totalDistance += tabScrollDistances[tabId];
        }
        chrome.storage.sync.set({ distance: totalDistance });
        sendResponse({ totalDistance: totalDistance });
        return true; // Need to return true to indicate that we will send a response asynchronously
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    delete tabScrollDistances[tabId];
});
