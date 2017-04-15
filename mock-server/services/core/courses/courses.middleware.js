const express = require('express');
const router = express.Router();
const url = require('url');
const _ = require('lodash');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true);
		let	courses = server.db.getState().courses;
		let query = url_parts.query;
		let sort = query.sort;
		let queryStr = query.query;

    if (queryStr) {
      courses = _.filter(courses, (course)=> (
        course.name.toLowerCase().includes(queryStr.toLowerCase())));
    }
    if (sort === "date") {
      courses = _.sortBy(courses, "date");
    }

		let from = query.start ? +query.start : 0;
		let to = query.count && query.start ? +query.start + +query.count : courses.length;
		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);

		console.log('sort, query, from, to', sort, queryStr, from, to);
    console.log('courses', courses.length)

		res.json(courses);
	});

	return router;
};
