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
    intervalId = setInterval(showNotification, 40*60*1000);
} else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            intervalId = setInterval(showNotification, 40*60*1000);
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
