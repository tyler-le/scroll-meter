let scrollTimeout = null;
let lastScrollPosition = window.scrollY;
let totalScrollDistance;

chrome.runtime.sendMessage({ getTotalDistances: true }, function (response) {
    totalScrollDistance = response.totalDistance;
})

function sendScrollChange(totalScrollDistance) {
    chrome.runtime.sendMessage({ totalScrollDistance });
}

function resetScrollDistance() {
    sendScrollChange(totalScrollDistance);
    chrome.runtime.sendMessage({ getTotalDistances: true }, function (response) {
        chrome.runtime.sendMessage({ updatePopup: true });
    });
}

function handleScroll() {
    const scrollDelta = Math.abs(window.scrollY - lastScrollPosition);
    lastScrollPosition = window.scrollY;
    totalScrollDistance += scrollDelta;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(resetScrollDistance, 1000);
}

window.addEventListener('scroll', handleScroll);
