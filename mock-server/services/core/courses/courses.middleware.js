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
    let count = query.count ? +query.count : courses.length;
    let reverse = query.reverse === 'true';

    if (from > courses.length) {
      from = courses.length - 2;
    }
    if (from < 0) {
      from = 0;
    }
		let to = from + count;
		if (to >= courses.length) {
			to = courses.length;
		}

    if (reverse) {
      const toTmp = to;
      to = courses.length - from;
      from = courses.length - toTmp;
    }

  	// console.log('sort, query, reverse, length, from, to', sort, queryStr, reverse, courses.length, from, to);
		courses = courses.slice(from, to);

		res.json(courses);
	});

	return router;
};
