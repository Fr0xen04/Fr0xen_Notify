let notificationId = 0;
let notificationCount = 0;
const defaultSound = 'notify.mp3';

function showNotification(header, text, sound) {
    if (notificationCount >= 5) {
        return;
    }

    notificationCount++;
    notificationId++;
    let notififi = notificationId;

    $('#notifications').append(`
        <div class="notification" id="notification-${notififi}">
            <div class="notification-content">
                <div class="notification-image">
                    <img src="./img/information.png">
                </div>
                <div class="notification-text">
                    <div class="notification-line1">${header}</div>
                    <div class="notification-line2">${text}</div>
                </div>
            </div>
            <svg class="notif-progressbar">
                <circle stroke="#FFFFFF40" stroke-width="0.24vh" fill="transparent" r="0.7vh" cx="1vh" cy="1vh" />
                <circle class="notif-progressbar-circle" stroke="#ffffff" stroke-width="0.24vh" fill="transparent" r="0.7vh" cx="1vh" cy="1vh" />
            </svg>
        </div>
    `);

    let audio = new Audio(`./sounds/${defaultSound}`);
    audio.play();

    const myElement = document.getElementById(`notification-${notififi}`);
    progressbar_notif(myElement, 5000);

    setTimeout(function () {
        $(`#notification-${notififi}`).css("animation-name", "notificationOut");
    }, 4900);

    setTimeout(function () {
        $(`#notification-${notififi}`).css("height", "0");
        $(`#notification-${notififi}`).css("margin-top", "0");
    }, 4900);

    setTimeout(function () {
        $(`#notification-${notififi}`).remove();
        notificationCount--;
    }, 4900);
}

function progressbar_notif(element, _time) {
    const elem = element.querySelector(".notif-progressbar-circle");
    let radius = elem.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let value = circumference;
    elem.style.strokeDasharray = `${value} ${circumference}`;

    const frame = () => {
        if (value <= 0) {
            clearInterval(progressbarNotifInterval);
        } else {
            value -= circumference / (_time / 1000) / 20;
            elem.style.strokeDasharray = `${value} ${circumference}`;
        }
    }
    const progressbarNotifInterval = setInterval(frame, 50);
}

window.addEventListener('message', (event) => {
    let data = event.data;
    if (data.action === "sendNotification") {
        showNotification(data.header, data.content, data.sound);
    }
});
