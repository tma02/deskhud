var app = require("app");
var BrowserWindow = require("browser-window");
var cpu = require("./cpu.js");
var ssid = require("./ssid.js");
var ram = require("./ram.js");
var config = require("./config.json");

require("crash-reporter").start();

var mainWindow = null;

app.on("window-all-closed", function() {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({transparent: true, frame: false, height: config.hud.h, width: config.hud.w, 'enable-larger-than-screen': true, resizable: false});
    mainWindow.loadUrl("file://" + __dirname + "/deskhud.html");
    mainWindow.setPosition(config.hud.x, config.hud.y);

    mainWindow.on("closed", function() {
        mainWindow = null;
    });

    setInterval(function() {
    	mainWindow.webContents.send('moduleUpdate', ssid.getLabel() + " " + cpu.getLabel() + " " + ram.getLabel());
    }, cpu.updateInterval);
});

app.dock.hide();