require("dotenv").config();
const path = require("node:path");
const { pool } = require("./db/pool");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const LocalStrategy = require('passport-local').Strategy;
const db = require("./db/queries")
const bcrypt = require("bcryptjs")


const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter)
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username)
      if (!user) {
        return done(null, false, { message: "Incorrect username" });

      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })

);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

  try {
    const user = await db.getUserById(id)
    done(null, user);
  } catch (err) {
    done(err);
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
