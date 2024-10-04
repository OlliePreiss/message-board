const express = require('express')
const path = require('node:path')
const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Express app listening on post ${PORT}!`));
