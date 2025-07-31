const express = require("express")
const app = express()
const port = process.env.PORT
/* const connection = require ("./database/connection") */
const routerMovies = require("./routes/movies")

app.use("/api/movies/",routerMovies)

/* app.get("/movies", (req, res) => {
    res.send("tutto il contenuto")
})

app.get("/movies/:id", (req, res) => {
    res.send("contenuto id " + req.params.id)
}) */

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})