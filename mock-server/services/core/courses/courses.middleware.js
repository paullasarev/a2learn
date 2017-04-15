const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true);
		let	courses = server.db.getState().courses;
		let query = url_parts.query;
		let from = query.start ? +query.start : 0;
		let to = query.count && query.start ? +query.start + +query.count : courses.length;
		let sort = query.sort;
		let queryStr = query.query;

		if (courses.length < to) {
			to = courses.length;
		}
		console.log('sort', sort);
		console.log('query', queryStr);
    console.log('courses', courses.length, from, to)
		courses = courses.slice(from, to);

		res.json(courses);
	});

	return router;
};
