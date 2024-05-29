$(document).ready(function () {
    let deferredPrompt;

    function checkPwaInstalled() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            localStorage.setItem('pwaInstalled', 'true');
            $('#install-button').hide();
        } else {
            localStorage.removeItem('pwaInstalled');
        }
    }

    checkPwaInstalled();

    if (localStorage.getItem('pwaInstalled') !== 'true') {
        $(window).on('beforeinstallprompt', function (e) {
            e.preventDefault();
            deferredPrompt = e.originalEvent;

            $('#sample-button').on('click', function () {
                $('#install-button').show();
            });

            $('#install-button').on('click', function () {
                $('#install-button').hide();
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function (choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        localStorage.setItem('pwaInstalled', 'true');
                    }
                    deferredPrompt = null;
                });
            });
        });
    }
});

