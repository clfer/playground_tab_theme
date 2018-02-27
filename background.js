browser.tabs.onActivated.addListener(themeTab)
browser.tabs.onRemoved.addListener(removeThemeTab);

var colorTabs;

function themeTab(tab) {
    if (typeof tab.tabId !== 'undefined') {
        var tabId = tab.tabId;
        if (typeof colorTabs === 'undefined'){
            colorTabs = new Object();
        }
        if (typeof colorTabs[tabId] === 'undefined'){
            console.log('New tab');
            colorTabs[tabId] = getRandomColor();
        }
        updateWindowColor(tab.windowId, colorTabs[tabId])
    }

}

function removeThemeTab(tabId) {
    delete colorTabs[tabId];
}

function updateWindowColor(windowId, color) {
    browser.theme.update(windowId, {
        images: {
            headerURL: "",
        },
        colors: {
            accentcolor: "black",
            textcolor: "white",
            toolbar: color,
            toolbar_text: "white"
        }
    });
}

function getRandomColor() {
    var availableColors = ['#D33', '#3D3', '#33D'];
    var colorId = Math.floor(Math.random() * availableColors.length);
    return availableColors[colorId];
}