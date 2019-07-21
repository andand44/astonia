$(function () {
    $(document).ready(function () {
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });
    });



});

$.getJSON('js/menu.json', function (data) {
    var output = "<ul>";

    for (var i in data) {
        if (data[i].marked === true) {
            output += "<li><a href=" + data[i].url + " target='_blank'>" + data[i].name + "</a></li>";
        } else {
            output += "<li><a href=" + data[i].url + ">" + data[i].name + "</a></li>";
        }

    }

    output += "</ul>";
    document.getElementById("nav").innerHTML = output;
});
