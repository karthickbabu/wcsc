!(function ($) {
    "use strict";

    $(document).ready(function () {
        document.querySelectorAll('.datetime').forEach(function (elem) {
            // <p class="datetime" from="2021-04-15 06:00" duration="90">Session 1: </p>
            var indiaTime = elem.getAttribute('from');
            var durationInMins = elem.getAttribute('duration');

            var timeZone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]

            var fromTimeIndia = moment.tz(indiaTime, "Asia/Kolkata");
            var fromTimeLocal = moment(fromTimeIndia).local();
            var timehtml = "<b>" + elem.innerHTML + "</b>";
            if (timeZone !== "IST") {
                timehtml += "<br>" + timeZone + " " + fromTimeLocal.format("ll LT") + " to "
                    + fromTimeLocal.clone().add(durationInMins, 'minutes').format("LT");
            }
            timehtml += "<br>" + "IST " + fromTimeIndia.format("ll LT") + " to "
                + fromTimeIndia.clone().add(durationInMins, 'minutes').format("LT");


            console.log(timehtml);

            elem.innerHTML = timehtml;
        })
    });



})(jQuery);