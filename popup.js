(function ($) {
    "use strict";
    var a = function () {
        $("#start, #stop").toggle()
    };

    function genRandNum() {
        var min = parseInt($("#txtMin").val());
        var max = parseInt($("#txtMax").val());

        if (typeof (min) == "number" && typeof (max) == "number") {
            if (min < 0 || Number.isNaN(min) || max < 0 || Number.isNaN(max)) {
                //In this case setting default value from 10 - 15.

                min = 10;
                $("#txtMin").val(min);

                max = 15;
                $("#txtMax").val(max);
            }
            
            return Math.ceil(Math.random() * (max - min + 1)) + min;    //Generating random num between 'min' and 'max'
        }
    }

    function reloadCurrent() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });
    }

    var refreshId = null;
    function randomReload(i, intrv) {
        refreshId = setInterval(function () {
            if (!(i % intrv)) {
                intrv = genRandNum();
                reloadCurrent();
                i = 0;
            }
            $("#cnt").text(i);
            i++;
        }, 1000);
    }

    $("#start").on("click", function () {
        randomReload(1, genRandNum());
        a();
    });

    $("#stop").on("click", function () {
        clearInterval(refreshId);   //Clearing Interval
        a();
    });

})(jQuery);