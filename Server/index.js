require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const {
	register,
	userSession,
	logout,
	login
} = require("./controllers/authCtrl");
const app = express();
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 13452345235623623456326435636
		}
	})
);

massive(process.env.CONNECTION_STRING).then(db => {
	app.set("db", db);

	console.log("db connected");
});

// app.get("/api/test", (req, res, next) => {
// 	const db = req.app.get("db");
// 	db.query("SELECT * FROM users1").then(users => {
// 		res.status(200).send(users);
// 	});
// });

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/user_session", userSession);
app.delete("/auth/logout", logout);

app.get("/api/inventory", (req, res, next) => {
	const db = req.app.get("db");
	db.query("SELECT * FROM inventory;").then(inventory => {
		res.status(200).send(inventory);
	});
});
app.listen(process.env.PORT, () => {
	console.log(`server running on ${process.env.PORT}`);
});
