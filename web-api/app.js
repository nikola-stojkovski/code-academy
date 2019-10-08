var express = require('express');

const app = express();

app.get('/nikola', (req, res) => {
    res.send("Hello from nikola!");
});

app.listen(3000, () => {
    console.log("API is listenig on port 3000!");
});