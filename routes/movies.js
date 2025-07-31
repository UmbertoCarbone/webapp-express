//import express
const express = require("express")
//definiaamo le rotte app
const router = express.Router()

router.get("/", (req, res) => {
    res.send("tutto il contenuto")
})

router.get("/:id", (req, res) => {
    res.send("contenuto id " + req.params.id)
})


module.exports = router