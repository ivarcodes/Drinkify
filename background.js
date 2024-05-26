let permissionDenied = false;
let intervalId;

function showNotification() {
    if (!permissionDenied) {
        if (Notification.permission === "granted") {
            new Notification("Water Reminder", {
                body: "Hey, Drink Water!!!",
                icon:"water.png"
            });
            
        }
    }
}


if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
} else if (Notification.permission === "granted") {
    // For demo purposes, the timer is set to 6 seconds, the timer would be set for every 40 minutes.

    intervalId = setInterval(showNotification, 6000);
} else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            intervalId = setInterval(showNotification, 6000);
        } else {
            permissionDenied = true;
        }
    }).catch(error => {
        console.error("Error requesting notification permission:", error);
    });
} else {
    permissionDenied = true;
}

if (permissionDenied) {
    clearInterval(intervalId);
}
