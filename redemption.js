document.addEventListener('DOMContentLoaded', function () {
    if (chrome.i18n.getUILanguage().includes('en')) {
        document.getElementById('blockPromotion').innerHTML = chrome.i18n.getMessage('blockPromotion');
        document.getElementById('title').innerHTML = chrome.i18n.getMessage('title');
        document.getElementById('saved').innerHTML = chrome.i18n.getMessage('saved');
        document.getElementById('supportCause').innerHTML = chrome.i18n.getMessage('supportCause');
    }
})