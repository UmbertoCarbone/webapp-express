const connection = require("../database/connection")

function index(req, res) {
    const sql = "SELECT * from movies"
    connection.query(sql, (err, result) => {

        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        res.json(result)
    })

}

function show(req, res) {
    const id = req.params.id

    const sql = `SELECT * from movies WHERE id = ?`
    connection.execute(sql, [id], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })

        if (result.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Movie not found"
            })
        }
        const movie = result[0]

        const reviewsSql = 'SELECT movies.*, reviews.text FROM movies LEFT JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ? '

        connection.execute(reviewsSql, [id], (err, result) => {
            if (err) return res.status(500).json({
                error: true,
                message: err.message
            })


            const movieReviews = result

            movie.reviews = movieReviews

            res.json(movie)
        })

    })
}

// Nel file controller/moviesController.js
/* function post(req, res) {
    const movieId = req.params.id;
    const { text, name, vote } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({
            error: true,
            message: "Il testo della recensione è obbligatorio"
        });
    }

    const sql = `INSERT INTO reviews (movie_id, text, name, vote) VALUES (?, ?, ?, ?)`;

    connection.execute(sql, [movieId, text.trim(), name || 'Anonimo', vote || 5], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Recensione aggiunta con successo",
            reviewId: result.insertId
        });
    });
} */
// Aggiungi post all'export
module.exports = {
    index,
    show,
   /*  post */  // ← Aggiungi questa
}





