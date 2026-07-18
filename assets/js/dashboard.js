// تایمر سود روزانه SHAYE
// زمان هدف: ساعت 16:00 ایران


function updateTimer(){


let now = new Date();


// زمان ایران

let iranTime = new Date(
now.toLocaleString(
"en-US",
{
timeZone:"Asia/Tehran"
}
)
);



// زمان امروز ساعت 16

let target = new Date(iranTime);

target.setHours(16);
target.setMinutes(0);
target.setSeconds(0);




// اگر ساعت از 16 گذشته بود
// برو برای فردا

if(iranTime >= target){

target.setDate(
target.getDate()+1
);

}



// اختلاف زمان

let distance =
target - iranTime;



let hours =
Math.floor(
distance/(1000*60*60)
);



let minutes =
Math.floor(
(distance%(1000*60*60))
/
(1000*60)
);



let seconds =
Math.floor(
(distance%(1000*60))
/
1000
);





// تبدیل به دو رقم

hours =
String(hours)
.padStart(2,"0");


minutes =
String(minutes)
.padStart(2,"0");


seconds =
String(seconds)
.padStart(2,"0");





document
.getElementById("timer")
.innerHTML =

hours+
":"+
minutes+
":"+
seconds;



}



setInterval(
updateTimer,
1000
);


updateTimer();