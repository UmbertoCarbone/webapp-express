function index(req, res)  {
    res.send("tutto il contenuto")
}

function show(req, res)  {
    res.send("contenuto id " + req.params.id)
}

module.exports = {
    index,
    show
}