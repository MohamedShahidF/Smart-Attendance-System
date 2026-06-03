let studentName = "";

function studentLogin() {
    const input = document.getElementById("studentName");
    studentName = input.value.trim();

    if (studentName === "") {
        alert("Please enter your name");
        return;
    }

    alert("Logged in as " + studentName);
}

// called when student clicks I'm Present
function markPresent() {

    if (studentName === "") {
        alert("Please login first");
        return;
    }

    fetch("/mark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: studentName
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "allowed") {
            alert("Marked Present");
        } else {
            alert("Connect to classroom Wi-Fi");
        }
    });
}

// called when teacher clicks Get Report
function getReport() {

    fetch("/report")
    .then(res => res.json())
    .then(data => {

        let reportBox = document.getElementById("report");
        reportBox.innerHTML = "";

        if (Object.keys(data).length === 0) {
            reportBox.innerHTML = "No attendance yet";
            return;
        }

        for (let name in data) {
            reportBox.innerHTML += name + " : " + data[name] + "<br>";
        }
    });
}
