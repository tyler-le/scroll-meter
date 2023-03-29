document.addEventListener('DOMContentLoaded', function () {
    const output = document.getElementById('output');

    chrome.runtime.sendMessage({ getTotalDistances: true }, function (response) {
        let pixelsToFeet = (response.totalDistance / 1152).toFixed(2);
        output.innerHTML = `Traveled ${response.totalDistance} px <br> Or ${pixelsToFeet} feet`;
        console.log('Current scroll distance:', response.totalDistance);
    });

    // Listen for messages from the content script to update the distance in real time
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.setPopup) {
            let pixelsToFeet = (message.data / 1152).toFixed(2);
            output.innerHTML = `Traveled ${message.data} px <br> Or ${pixelsToFeet} feet`;

        }
    });
});
