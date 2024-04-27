const express = require('express')
const mongoose = require("mongoose")
const Event = require("./models/Event")
const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post("/", async (req, res) => {
    try {
        const data = await Event.create(req.body)
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect("mongodb+srv://ThousifBaba:ThousifBaba@eventsapi.dvtnwjo.mongodb.net/Events-Api?retryWrites=true&w=majority&appName=EventsApi")
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("Events API app is runnig on port 3000")
        })
    }).catch((error) => {
        console.log(error)
    })