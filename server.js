require('dotenv').config();
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3030

// ✅ CORS per permettere a React di comunicare con Express
app.use(cors({
    origin: 'http://localhost:5173'  // Porta di React/Vite
}));

// ✅ Middleware per parsing JSON
app.use(express.json());

// ✅ Servire immagini statiche PRIMA dei middleware di errore
app.use(express.static('public'))

const routerMovies = require("./routes/movies")

// ✅ Rotte API
app.use("/api/movies/", routerMovies)

// ✅ SPOSTA I MIDDLEWARE ALLA FINE (dopo tutto il resto)
const notFound = require("./middlewares/notFound")
const serverError = require("./middlewares/serverError")

app.use(notFound);
app.use(serverError);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})