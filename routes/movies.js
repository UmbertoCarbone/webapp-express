//import express
const express = require("express")
//definiaamo le rotte app
const router = express.Router()
const moviesController = require("../controller/moviesController")

router.get("/", moviesController.index)

router.get("/:id",moviesController.show )


module.exports = router