const express = require("express")
const app = express()
const port = process.env.PORT

app.use(express.static("public"))

app.get("/movies", (req, res) => {
    res.send("tutto il contenuto")
})

app.get("/movies/:id", (req, res) => {
    res.send("contenuto id " + req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})