document.addEventListener('DOMContentLoaded', function () {
    if (chrome.i18n.getUILanguage().includes('en')) {
        document.getElementById('title').innerHTML = chrome.i18n.getMessage('optionsTitle');
        document.getElementById('header').innerHTML = chrome.i18n.getMessage('optionsHeader');
        document.getElementById('save').innerHTML = chrome.i18n.getMessage('optionsSaveButton');
    }
    chrome.storage.local.get(["blocked"], function (local) {
        const { blocked } = local;
        if (Array.isArray(blocked)) {
            textarea.value = blocked.join("\n");
        }
    })
})

const textarea = document.getElementById("textarea");
const save = document.getElementById("save");

save.addEventListener("click", () => {
    const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
    chrome.storage.local.set({ blocked });
});