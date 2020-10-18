/* Requires Express and data.json file */
const express = require('express');
const {projects} = require('../data.json');
const router = express.Router();

/* Home Route */
router.get(`/`, (req, res) => {
	res.render(`index`, {projects});
});

/* About Route */
router.get(`/about`, (req, res) => {
	res.render(`about`);
});

/* Project Route */
router.get(`/project/:id`, (req, res) => {
	const id = req.params.id;
	const project = projects[id];

	if (project) {
		res.render(`project`, {project});
	} else {
		res.render(`page-not-found`, {
			err: {
				status: 404,
				message: `Project ${id} doesn't exist just yet`
			}});
	}
});

module.exports = router;