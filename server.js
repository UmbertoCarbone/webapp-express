const express = require("express");
const app = express();
const port = 3030;

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});


app.get("/movies", (req,res)=>{
    res.send("All Movies")
})

app.get("/movies/:id", (req,res)=>{
    res.send(`Single Movies ${req.params.id}`)
})

