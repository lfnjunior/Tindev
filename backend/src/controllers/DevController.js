const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		const { user } = req.headers;
		const loggedDev = await Dev.findById(user);
		const users = await Dev.find({
			$and: [{ _id: { $ne: user } },
				   { _id: { $nin: loggedDev.likes } },
				   { _id: { $nin: loggedDev.dislikes } }],
		});
		return res.json(users);
	},

	async store(req, res) {
		const { username: user } = req.body;
		const userExists = await Dev.findOne({ user });
		if (userExists) {
			return res.json(userExists);
		}
		const response = await axios.get(`https://api.github.com/users/${user}`);
		const { name, bio, avatar_url: avatar } = response.data;
		const dev = await Dev.create({ name, user, bio, avatar});
		return res.json(dev);
	}

};