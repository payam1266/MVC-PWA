$(document).ready(function () {
    $('#back-button').on('click', function () {
        window.history.back();
    });

    $('#forward-button').on('click', function () {
        window.history.forward();
    });
});