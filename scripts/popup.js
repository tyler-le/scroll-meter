document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['distance'], function (result) {
        const pxContainer = document.getElementById("px-dist");
        const ftContainer = document.getElementById("ft-dist");
        renderPopup(pxContainer, ftContainer, result.distance);
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.setPopup) {
        const pxContainer = document.getElementById("px-dist");
        const ftContainer = document.getElementById("ft-dist");
        renderPopup(pxContainer, ftContainer, message.data);
    }
});

function renderPopup(pxContainer, ftContainer, pixels) {
    let pixelsToFeet = (pixels / 1152).toFixed(2);
    pxContainer.textContent = (!pixels) ? '0' : `${pixels}`
    ftContainer.textContent = (isNaN(pixelsToFeet)) ? '0' : `${pixelsToFeet}`;
}
