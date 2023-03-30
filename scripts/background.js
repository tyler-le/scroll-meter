chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.totalScrollDistance) {
        chrome.storage.sync.set({ distance: message.totalScrollDistance });
    }

    else if (message.getTotalDistances) {
        chrome.storage.sync.get(['distance'], function (result) {
            sendResponse({ totalDistance: (result.distance || 0) });
        });

        return true; // Need to return true to indicate that we will send a response asynchronously
    }

    else {
        console.error('No such message exists' + message)
    }
});
