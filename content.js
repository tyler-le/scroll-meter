let scrollDistance = 0;
let scrollTimeout = null;
let lastScrollPosition = window.scrollY;
let counter = 0;

function sendScrollDistance(scrollDistance, tabId) {
    chrome.runtime.sendMessage({ scrollDistance: scrollDistance, tabId: tabId });
}

window.addEventListener('scroll', function () {
    // Calculate the distance that the user has scrolled since the last scroll event
    const scrollDelta = Math.abs(window.scrollY - lastScrollPosition);
    lastScrollPosition = window.scrollY;

    // Add the scroll delta to the total scroll distance
    scrollDistance += scrollDelta;

    // Reset the scroll timeout
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {

        // Reset the scroll distance to zero
        counter += scrollDistance
        scrollDistance = 0;

        // Ask the background script to retrieve the active tab information
        chrome.runtime.sendMessage({ getActiveTab: true }, function (response) {
            const tabId = response.tabId;
            if (tabId) {
                sendScrollDistance(counter, tabId);

                // Log the current scroll distance and tab ID to the console
                console.log('[Content Script] Scroll distance of tab', tabId, ':', counter, 'pixels');
            }
        });

    }, 1000); // Set the timeout period to 1 second (adjust as desired)
});

// When the content script is loaded, request the current scroll distance from the background script
chrome.runtime.sendMessage({ getScrollDistance: true }, function (response) {
    scrollDistance = response.scrollDistance || 0;
});
