import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import files
import db from "./config/db.js";
import personRoutes from './features/routes/personRoutes.js'
import menuRoutes from "./features/routes/menu.routes.js"


const app = express();


// env file
dotenv.config();
// bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// port environment
const PORT = process.env.PORT || 3000;


// routes
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

// initial route
app.get("/", function (req, res) {
  res.send("Hello Welcome to our Restaurant");
});

app.listen(3000, () => {
  console.log(`listening to port ${PORT}`);
});
