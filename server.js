const express = require('express');
const logger = require('morgan');

const ratesRouter = require('./routes/ratesRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/rates', ratesRouter);

app.use("*", (req, res, next)=>{
  res.redirect("/api/rates");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})

module.exports = app;