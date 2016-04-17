 var admobid = {};
        if (/(android)/i.test(navigator.userAgent)) {
            admobid = { // for Android
                banner: 'ca-app-pub-7048619120455093/2098161962',
                interstitial: 'ca-app-pub-7048619120455093/4197017160'
            };
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-7048619120455093/7227548760',
                interstitial: 'ca-app-pub-7048619120455093/8704281960'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-7048619120455093/2657748360',
                interstitial: 'ca-app-pub-7048619120455093/4134481561'
            };
        }

        function createSelectedBanner() {
            if (AdMob) AdMob.createBanner({
                adId: admobid.banner,
                overlap: $('#overlap').is(':checked'),
                offsetTopBar: $('#offsetTopBar').is(':checked'),
                adSize: $('#adSize').val(),
                position: $('#adPosition').val(),
            });
        }

        function showBannerAtPosition() {
            if (AdMob) AdMob.showBanner($('#adPosition').val());
        }

        function onDeviceReady() {
            if (!AdMob) {
                alert('admob plugin not ready');
                return;
            }
            initAd();
            // display a banner at startup
            createSelectedBanner();
        }

        function initAd() {
            AdMob.getAdSettings(function (info) {
                console.log('adId: ' + info.adId + '\n' + 'adTrackingEnabled: ' + info.adTrackingEnabled);
            }, function () {
                console.log('failed to get user ad settings');
            });
            AdMob.setOptions({
                adSize: 'SMART_BANNER',
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                bgColor: 'white',
                autoShow: true
            });

            $(document).on('onAdFailLoad', function (e) {

                if (typeof e.originalEvent !== 'undefined') e = e.originalEvent;
                var data = e.detail || e.data || e;
                alert('error: ' + data.error +
                    ', reason: ' + data.reason +
                    ', adNetwork:' + data.adNetwork +
                    ', adType:' + data.adType +
                    ', adEvent:' + data.adEvent);
            });
            $(document).on('onAdLoaded', function (e) {});
            $(document).on('onAdPresent', function (e) {});
            $(document).on('onAdLeaveApp', function (e) {});
            $(document).on('onAdDismiss', function (e) {});
            $('#btn_create').click(createSelectedBanner);
            $('#btn_remove').click(function () {
                AdMob.removeBanner();
            });
            $('#btn_show').click(showBannerAtPosition);
            $('#btn_hide').click(function () {
                AdMob.hideBanner();
            });
            // test interstitial ad
            $('#btn_prepare').click(function () {
                AdMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: $('#autoshow').is(':checked'),
                });
            });
            $('#btn_showfull').click(function () {
                AdMob.showInterstitial();
            });

            $(document).on('backbutton', function () {
                if (window.confirm('Are you sure to quit?')) navigator.app.exitApp();
            });

            $(document).on('resume', function () {
                AdMob.showInterstitial();
            });
        }

        $(window).resize(function () {
            $('#textinfo').html('web view: ' + $(window).width() + " x " + $(window).height());
        });
        $(document).ready(function () {

            if (/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent)) {
                document.addEventListener('deviceready', onDeviceReady, false);
            } else {
                onDeviceReady();
            }
        });