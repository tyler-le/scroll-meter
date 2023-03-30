document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['distance'], function (result) {
        const pxContainer = document.getElementById("px-dist");
        const ftContainer = document.getElementById("ft-dist");
        renderPopup(pxContainer, ftContainer);
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.updatePopup) {
        const pxContainer = document.getElementById("px-dist");
        const ftContainer = document.getElementById("ft-dist");
        renderPopup(pxContainer, ftContainer);
    }
});

function renderPopup(pxContainer, ftContainer) {
    chrome.storage.sync.get(['distance'], function (result) {
        const pixels = result.distance || 0;
        console.log(`[Popup] ${result.distance}`)
        let pixelsToFeet = (pixels / 1152).toFixed(2);
        pxContainer.textContent = `${pixels}`
        ftContainer.textContent = `${pixelsToFeet}`;
    });

}
