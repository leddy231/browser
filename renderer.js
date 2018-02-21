
const view = document.getElementById("view");
const urlBar = document.getElementById("url");
const TabHTML = '<webview class = "hidden" src="https://www.google.com/" allowpopups></webview>'
const TabMiniHTML = '<div class = "button small"></div>'
const tabsHolder = document.getElementById("tabs");
const miniTabsHolder = document.getElementById("miniTabs");
const tabsCountIcon = document.getElementById("tabsCount")
var tabs = [];
var activeTab = 0;

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function updateUrl(url, id) {
    if(id == activeTab) {
        urlBar.value = url.url;
    }
    tabs[id].url = url
}

function addTab() {
    var id = tabs.length
    var view = createElementFromHTML(TabHTML);
    view.addEventListener("did-navigate-in-page", function(url){
        updateUrl(url, id);
        console.log(url + ":" + id)
    })
    
    view.addEventListener("did-navigate", function(url){
        updateUrl(url, id);
    })
    tab = {"id": id, "view": view}
    tabs.push(tab)
    tabsHolder.appendChild(view)
    switchTab(id)
    str = 'filter_9_plus'
    if (id < 9) {
        str = 'filter_' + (id + 1)
    }
    tabsCountIcon.innerHTML = str
}

function switchTab(id) {
    miniTabsHolder.innerHTML = ""
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].view.className = "hidden"
    }
    tabs[id].view.className = "view"
    urlBar.value = tabs[id].view.src
    activeTab = id
}

function activeView() {
    return tabs[activeTab].view
}

function close() {
    const remote = require('electron').remote;
    let w = remote.getCurrentWindow();
    w.close();
}

function min() {
    const remote = require('electron').remote;
    let w = remote.getCurrentWindow();
    w.minimize();
}

function refresh() {
    activeView().reload();
}

function loadUrl() {
    s = urlBar.value;
    var prefix = 'http://';
    if (s.substr(0, prefix.length) !== prefix)
    {
        s = prefix + s;
    }
    activeView().src = s;
}

function back() {
    activeView().goBack();
}

function viewTabs() {
    activeView().className = "hidden"
    miniTabsHolder.innerHTML = ""
    for (var i = 0; i < tabs.length; i++) {
        var button = createElementFromHTML(TabMiniHTML)
        let j = i
        button.addEventListener("click", function() {
            switchTab(j)
        })
        button.innerHTML = tabs[i].view.getTitle()
        miniTabsHolder.appendChild(button)
    }
    var button = createElementFromHTML(TabMiniHTML)
    button.addEventListener("click", addTab)
    button.innerHTML = '<i class="material-icons">queue</i>'
    miniTabsHolder.appendChild(button)
}

document.getElementById("closeButton").addEventListener("click", close);
document.getElementById("minButton").addEventListener("click", min);
document.getElementById("refreshButton").addEventListener("click", refresh);
document.getElementById("backButton").addEventListener("click", back);
document.getElementById("tabsButton").addEventListener("click", viewTabs);
urlBar.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        loadUrl();
    }
});

function doc_keyUp(e) {
    if (e.ctrlKey && e.keyCode == 72) {
        activeView().openDevTools();
    }
}
// register the handler 
document.addEventListener('keyup', doc_keyUp, false);

addTab()

