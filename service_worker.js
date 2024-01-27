chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked"], function (local) {
        if (!Array.isArray(local.blocked)) {
            fetch('bild.json').then((response) => response.json()).then(data => {
                chrome.storage.local.set({ blocked: data['hostnames'] });
                console.log('es hat tolle sachen gemacht')
            });
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
        return;
    }

    const tabUrl = new URL(url);

    chrome.storage.local.get(["blocked"], function (local) {
        const { blocked } = local;
        if (Array.isArray(blocked) && blocked.find(domain => tabUrl.hostname.includes(domain))) {
            chrome.tabs.update(tabId, { "url": "redemption.html" });
            return;
        }
    });

    console.log(tabUrl.pathname);
    console.log(tabUrl.search);

    if (tabUrl.hostname.includes('google')) {
        if (tabUrl.pathname.startsWith('/search')) {
            if (!(tabUrl.search.includes('&as_eq=') || (new RegExp('-[a-zA-Z]+[.][a-zA-Z]', 'g').test(tabUrl.search)))) {
                chrome.storage.local.get(["blocked"], function (local) {
                    if (Array.isArray(local.blocked)) {
                        var blocklist = 'lalala';
                        local.blocked.forEach((listItem, itemIndex) => { itemIndex > 0 ? blocklist += '+' + listItem : blocklist = listItem });
                        chrome.tabs.update(tabId, { "url": url + '&as_eq=' + blocklist })
                    }
                })
            }
        }
    }
});
