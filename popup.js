document.addEventListener('DOMContentLoaded', function () {
    const output = document.getElementById('output');

    chrome.runtime.sendMessage({ getTotalDistances: true }, function (response) {
        output.innerHTML = `Traveled ${response.totalDistance} px`;
        console.log('Current scroll distance:', response.totalDistance);
    });





});
