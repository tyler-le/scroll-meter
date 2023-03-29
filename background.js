let tabScrollDistances = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getScrollDistance) {
        const tabId = sender.tab.id;
        const scrollDistance = tabScrollDistances[tabId] || 0;
        sendResponse({ scrollDistance: scrollDistance });
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    delete tabScrollDistances[tabId];
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.scrollDistance) {
        const tabId = sender.tab.id;
        const scrollDistance = message.scrollDistance;
        tabScrollDistances[tabId] =
            (tabScrollDistances[tabId] || 0) + scrollDistance;
        console.log(
            "[Background Script] Scroll distance of tab",
            tabId,
            ":",
            tabScrollDistances[tabId],
            "pixels"
        );
    }

    else if (message.getScrollDistance) {
        const tabId = sender.tab.id;
        const scrollDistance = tabScrollDistances[tabId] || 0;
        sendResponse({ scrollDistance: scrollDistance });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getActiveTab) {
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
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getTotalDistances) {
        let totalDistance = 0;
        for (let tabId in tabScrollDistances) {
            totalDistance += tabScrollDistances[tabId];
        }
        sendResponse({ totalDistance: totalDistance });

        return true; // Need to return true to indicate that we will send a response asynchronously
    }
});


