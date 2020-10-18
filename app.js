/* Requires Express and index routes */
const express = require('express');
const app = express();
const indexRoutes = require("./routes/index");
const port = process.env.PORT || 80;
const path = require('path');

/* Sets up the view engine to pug, uses the routes created in index.js, and serves the static files located in the public folder */
app.set('view engine', 'pug');
app.use('/', indexRoutes);
app.use('/static', express.static(path.join(__dirname, 'public')));

/* 404 Error Handler */
app.use(`/:page`, (req, res, next) => {
  const page = req.params.page;
  const err = new Error(`Hmm, looks like route /${page} doesn't exist.`);
  err.status = 404;
  throw err;
});

/* Global error handler that catches the err thrown by the error handler above */
app.use((err, req, res, next) => {
	console.log('global error handler requested');
	if (err.status === 404) {
    	res.render('page-not-found', {err});
 	} else {
		res.render('error', {
			err: {
				status: 500,
				message: err.message
			}
		});
	}
});

/* Sets up and listens to local host 3000 to run the site */
app.listen(port, () => {
	console.log(`The application is running on ${port}`)
});