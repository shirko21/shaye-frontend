function startSHAYETimer() {

    const timer = document.getElementById("timer");

    if (!timer) {
        return;
    }


    function updateTimer() {

        let now = new Date();

        // ساعت ایران (UTC+3:30 یا UTC+4:30 در زمان تابستانی)
        let iranTime = new Date(
            now.toLocaleString("en-US", {
                timeZone: "Asia/Tehran"
            })
        );


        let target = new Date(iranTime);

        target.setHours(16);
        target.setMinutes(0);
        target.setSeconds(0);


        // اگر از ساعت ۱۶ گذشته باشد، هدف فردا است
        if (iranTime >= target) {

            target.setDate(target.getDate() + 1);

        }


        let distance = target - iranTime;


        let hours = Math.floor(distance / (1000 * 60 * 60));

        let minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );


        let seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );


        timer.innerHTML =

            String(hours).padStart(2,"0")
            + ":"
            +
            String(minutes).padStart(2,"0")
            + ":"
            +
            String(seconds).padStart(2,"0");


    }


    updateTimer();

    setInterval(updateTimer,1000);

}


startSHAYETimer();