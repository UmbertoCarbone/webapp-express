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
/* console.log(result)
console.log(result.length) */
        if (result.length == 0) {
            return res.status(404).json({
                error: true,
                message: "Movie not found"
            })
        }
        const movie = result[0]

        const reviewsSql = 'SELECT movies.*, reviews.text, reviews.name, reviews.vote FROM movies LEFT JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ? '

        connection.execute(reviewsSql, [id], (err, result) => {
            if (err) return res.status(500).json({
                error: true,
                message: err.message
            })


            const movieReviews = result
            console.log(result)
            movie.reviews = movieReviews

            res.json(movie)

        })

    })
}


function storeReview(req, res) {
    const { id } = req.params
    const { text, name, vote } = req.body;

    const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`

    connection.execute(sql, [id, name, vote, text], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }

        res.status(201).json({
            error: false,
            message: "Recensione aggiunta con successo",
            review: {
                id: result.insertId,
                movie_id: id,
                name: name,
                vote: vote,
                text: text
            }
        });
    });
}
// Aggiungi post all'export
module.exports = {
    index,
    show,
    storeReview
}





