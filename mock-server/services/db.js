const jsonServer = require('json-server');
const _ = require('lodash');

module.exports = (files) => {
	let db = {};

	for (let file of files) {
		if (file.match(/db\.json$/gi)) {
			let data = require(file);
      console.log('db', file)
			db = _.merge(db, data);
		}
	}

	return jsonServer.router(db);
};
