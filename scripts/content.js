
const regexDirect = /(((([dD]ie\s)?"?(BILD)"?)|(([dD]ie\s)"?(Bild)"?(?![a-zA-Z])))((?:.Zeitung)|(?:\.de))?"?)|("?(Bild)"?.Zeitung"?)/g;
const regexReferring = /(([dD]er\s)"?(Bild)"?(?![a-zA-Z]))|(([dD]er\s)"?(BILD)"?)/g;
const replaceOptionsReferring = [
    "Einer unseriösen Zeitung",
    "Einer nicht nennenswerten Zeitung",
    "Einer regelmäßig gegen den Pressekodex verstoßenden Zeitung",
    "Einer überspitze Informationen verbreitenden Zeitung",
    "Einer Fehlinformationen verbreitenden Zeitung",
    "Einer grundlos Menschen in Sachen verwickelnden Zeitung",
    "Einer unschuldige Menschen für Verbrechen bezichtigenden Zeitung",
    "Einer dem Axel Springer Verlag angehörenden Zeitung",
    "Einer mit B anfangenden Zeitung",
    "Einer Zeitung, dessen Name nicht genannt werden darf",
    "Der **** Zeitung"
]
const replaceOptions = [
    "Eine unseriöse Zeitung",
    "Eine nicht nennenswerte Zeitung",
    "Eine regelmäßig gegen den Pressekodex verstoßende Zeitung",
    "Eine überspitze Informationen verbreitende Zeitung",
    "Eine Fehlinformationen verbreitende Zeitung",
    "Eine grundlos Menschen in Sachen verwickelnde Zeitung",
    "Eine unschuldige Menschen für Verbrechen bezichtigende Zeitung",
    "Eine dem Axel Springer Verlag angehörende Zeitung",
    "Eine mit B anfangende Zeitung",
    "Eine Zeitung, dessen Name nicht genannt werden darf",
    "Die **** Zeitung"
];

var replaceTextInNode = function (parentNode) {
    for (var i = parentNode.childNodes.length - 1; i >= 0; i--) {
        var node = parentNode.childNodes[i];
        if (node.nodeType == Element.TEXT_NODE) {
            node.textContent = node.textContent.replace(regexReferring, function () {
                return replaceOptionsReferring[Math.floor(Math.random() * replaceOptionsReferring.length)];
            });
            node.textContent = node.textContent.replace(regexDirect, function () {
                return replaceOptions[Math.floor(Math.random() * replaceOptions.length)];
            });
        } else if (node.nodeType == Element.ELEMENT_NODE) {
            replaceTextInNode(node);
        }
    }
};

window.addEventListener(('load'), function () {
    replaceTextInNode(document.body);
});

var mutationObserver = new MutationObserver(function () { replaceTextInNode(document.body) });

mutationObserver.observe(document.body, { childList:true, subtree:true })