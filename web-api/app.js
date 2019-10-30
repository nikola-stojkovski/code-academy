var express = require('express');
var bodyParser = require('body-parser');
// const users = require('./users/routes');
// const posts = require('./posts/routes');
const appRouter = require('./router');
const middleware = require('./middlewares/common')
require('dotenv/config');

const app = express();

app.use(middleware.logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/users', users);
// app.use('/users/:id/posts', posts);

app.use(appRouter);

app.use(middleware.wrongRoute);
app.use(middleware.errorHandler);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});