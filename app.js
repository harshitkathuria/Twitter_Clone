const express = require("express");
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/tweets", tweetRoute);
// app.use("/api/likes", likeRoute);
// app.use("/api/notifications", notificationRoute);
// app.use("/api/bookmarks", bookmarkRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Could not find ${req.url}`
  });
});

module.exports = app;
