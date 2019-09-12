const mongoose = require('mongoose');

const db = mongoose.connect('', {
	useNewUrlParser: true,
});

module.exports = db;