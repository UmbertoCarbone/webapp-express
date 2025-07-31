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

        connection.execute(reviewsSql,[id], (err, result) => {
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



module.exports = {
    index,
    show
}




