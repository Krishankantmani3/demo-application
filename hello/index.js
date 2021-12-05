const express = require('express');
const app = express();

app.get('/api/architect/tasks', (req, res)=>{
    console.log("hello-world");
    res.status(200).json("hello");
});

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});
