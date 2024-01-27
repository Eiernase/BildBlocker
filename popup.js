document.addEventListener('DOMContentLoaded', function () {
    if (chrome.i18n.getUILanguage().includes('en')) {
        document.getElementById('optionsbutton').innerHTML = chrome.i18n.getMessage('optionsButton');
        document.getElementById('info').innerHTML = chrome.i18n.getMessage('info');
    }
})