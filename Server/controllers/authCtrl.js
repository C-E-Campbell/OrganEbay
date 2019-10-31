const bcrypt = require("bcryptjs");
module.exports = {
	register: async (req, res, next) => {
		console.log("hello");
		const { email, password, user_name } = req.body;
		const db = req.app.get("db");
		const foundUser = await db.find_user([email]);
		if (foundUser.length) {
			return res
				.status(409)
				.send("This user already exists. Sign in with your account.");
		} else {
			const hash = await bcrypt.hashSync(password, 10);
			console.log(email, hash, user_name);
			const [newUser] = await db.create_user([email, hash, user_name]);
			req.session.user = newUser;

			return res.status(201).send(req.session.user);
		}
	},
	login: (req, res, next) => {
		const { email, password } = req.body;
		const db = req.app.get("db");
		db.find_user([email]).then(foundUser => {
			if (!foundUser) {
				res.status(400).send("User already has account. login.");
			} else {
				bcrypt
					.compare(password, foundUser[0].password)
					.then(isAuthenticated => {
						if (isAuthenticated) {
							req.session.user = {
								user_id: foundUser.user_id,
								username: foundUser.user_name,
								email: foundUser.email
							};
						} else {
							res.status(400).send("you must register");
						}
					});
			}
		});
	},
	userSession: (req, res, next) => {
		res.status(200).send(req.session.user);
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.sendStatus(200);
	}
};
