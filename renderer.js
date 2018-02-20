
const view = document.getElementById("view");
const urlBar = document.getElementById("url");

function close() {
    const remote = require('electron').remote;
    let w = remote.getCurrentWindow();
    w.close();
}

function max() {
    const remote = require('electron').remote;
    let w = remote.getCurrentWindow();
    w.maximize();
}

function min() {
    const remote = require('electron').remote;
    let w = remote.getCurrentWindow();
    w.minimize();
}

function refresh() {
    view.reload();
}

function loadUrl() {
    s = urlBar.value;
    var prefix = 'http://';
    if (s.substr(0, prefix.length) !== prefix)
    {
        s = prefix + s;
    }
    view.src = s;
}

function back() {
    view.goBack();
}

function updateUrl(url) {
    urlBar.value = url.url;
}

document.getElementById("closeButton").addEventListener("click", close);
document.getElementById("maxButton").addEventListener("click", max);
document.getElementById("minButton").addEventListener("click", min);
document.getElementById("refreshButton").addEventListener("click", refresh);
document.getElementById("backButton").addEventListener("click", back);
urlBar.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        loadUrl();
    }
});

view.addEventListener("did-navigate-in-page", function(url){
    updateUrl(url);
})

view.addEventListener("did-navigate", function(url){
    updateUrl(url);
})
