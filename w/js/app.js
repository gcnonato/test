function onAppReady() {
    if (navigator.splashscreen && navigator.splashscreen.hide) { // Cordova API detected
        navigator.splashscreen.hide();
    }
    // init admob
    initAdMob();
}
document.addEventListener("app.Ready", onAppReady, false);