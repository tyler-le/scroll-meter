let tabScrollDistances = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getScrollDistance) {
        chrome.storage.sync.get(['distance'], function (result) {
            sendResponse({ scrollDistance: result.distance });
        });
    }

    else if (message.delta) {
        chrome.storage.sync.get(['distance'], function (result) {
            chrome.storage.sync.set({ distance: (result.distance || 0) + message.delta });
        });
    }


    else if (message.getTotalDistances || message.updatePopup) {

        chrome.storage.sync.get(['distance'], function (result) {
            sendResponse({ totalDistance: (result.distance || 0) });
        });

        return true; // Need to return true to indicate that we will send a response asynchronously
    }
});
