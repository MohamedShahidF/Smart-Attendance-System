const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

let attendance = {};

app.post("/mark", (req, res) => {
    const ip = req.socket.remoteAddress;
    const name = req.body.name;

    if (!name) {
        return res.send({ status: "error" });
    }

    if (
        ip.includes("192.168") ||
        ip.includes("10.") ||
        ip.includes("172.")
    ) {
        attendance[name] = "Present";
        res.send({ status: "allowed" });
    } else {
        res.send({ status: "blocked" });
    }
});

app.get("/report", (req, res) => {
    res.json(attendance);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

