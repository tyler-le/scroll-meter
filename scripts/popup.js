document.addEventListener('DOMContentLoaded', function () {
    checkFirstRun();
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
        pxContainer.textContent = `${pixels.toFixed(0)}`
        ftContainer.textContent = `${pixelsToFeet}`;
    });

}

function checkFirstRun() {
    const firstRun = localStorage.getItem("firstRun") === null;
    if (firstRun) {
        const main = document.querySelector("main");

        // Display a message to the user to restart their browser
        main.innerHTML = `<div style="border: 1px solid; margin: 10px 0px; padding: 15px; color: #D8000C; background-color: #FFBABA;">Please restart your browser to complete the installation of this extension.</div>`;

        // Set a flag in local storage to indicate that the extension has already been run
        localStorage.setItem("firstRun", "false");
        return;
    }
}