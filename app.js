const express = require("express");
const app = express();
const invenRouter = require("./routes/invenRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // static files (css)

app.use("/", invenRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Express app listening on port ${port}.`);
});