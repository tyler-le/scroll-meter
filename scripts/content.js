let scrollTimeout = null;
let lastScrollPosition = window.scrollY;
let totalScrollDistance = 0;

function sendScrollChange(delta) {
    chrome.runtime.sendMessage({ delta });
}

function resetScrollDistance() {
    sendScrollChange(totalScrollDistance);
    chrome.runtime.sendMessage({ updatePopup: true }, function (response) {
        chrome.runtime.sendMessage({ setPopup: true });
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
