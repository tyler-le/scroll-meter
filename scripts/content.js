let scrollDistance = 0;
let scrollTimeout = null;
let lastScrollPosition = window.scrollY;
let counter = 0;

function sendScrollDistance(counter, tabId) {
    chrome.runtime.sendMessage({ counter, tabId });
}

function resetScrollDistance() {
    counter += scrollDistance;
    scrollDistance = 0;

    chrome.runtime.sendMessage({ getActiveTab: true }, function (response) {
        const tabId = response.tabId;
        if (tabId) {
            console.log(`[Content Script] Scroll distance of tab ${tabId}: ${counter} pixels`);
            sendScrollDistance(counter, tabId);
        }
    });

    chrome.runtime.sendMessage({ updatePopup: true }, function (response) {
        chrome.runtime.sendMessage({ setPopup: true, data: response.totalDistance });
    });
}

function handleScroll() {
    const scrollDelta = Math.abs(window.scrollY - lastScrollPosition);
    lastScrollPosition = window.scrollY;
    scrollDistance += scrollDelta;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(resetScrollDistance, 1000);
}

window.addEventListener('scroll', handleScroll);

chrome.runtime.sendMessage({ getScrollDistance: true }, function (response) {
    scrollDistance = response.scrollDistance || 0;
});
