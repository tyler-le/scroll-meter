document.addEventListener('DOMContentLoaded', function () {
    const pxContainer = document.getElementById("px-dist");
    const ftContainer = document.getElementById("ft-dist");

    chrome.runtime.sendMessage({ getTotalDistances: true }, function (response) {
        renderPopup(pxContainer, ftContainer, response.totalDistance);
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.counter) {
        const pxContainer = document.getElementById("px-dist");
        const ftContainer = document.getElementById("ft-dist");
        renderPopup(pxContainer, ftContainer, message.counter);
    }
});

function renderPopup(pxContainer, ftContainer, pixels) {
    let pixelsToFeet = (pixels / 1152).toFixed(2);
    pxContainer.textContent = `${pixels}`
    ftContainer.textContent = `${pixelsToFeet}`;
}
