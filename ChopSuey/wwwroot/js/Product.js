document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.share-button').addEventListener('click', function () {
        if (navigator.share) {
            navigator.share({
                title: 'کالای فرضی',
                text: 'یک نمونه فرضی از کالا.',
                url: window.location.href
            }).then(() => {
                console.log('اشتراک گذاری موفق بود.');
            }).catch((error) => {
                console.log('خطا در اشتراک گذاری', error);
            });
        } else {
            alert('اشتراک گذاری با مشکل مواجه شده است.');
        }
    });

    document.querySelector('.like-button').addEventListener('click', function () {
        alert('شما این کالا را لایک کردید!');
    });

    document.querySelector('.save-button').addEventListener('click', function () {
        alert('این کالا برای بعد ذخیره شد!');
    });

});