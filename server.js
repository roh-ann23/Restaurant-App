import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import files
import db from "./config/db.js";
import personRoutes from './features/routes/personRoutes.js'
import menuRoutes from "./features/routes/menu.routes.js"

// passport 
import passport from "./features/middleware/auth.js";

// swagger
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// swagger configure

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Restaurant Application",
      description: "Node and ExpressJs Project as Restaurant Aplication",
    },
    servers: [
      {
        url: "http//:localhost:3000",
      },
    ],
  },
  apis: ["./features/routes/*.js"],
};
const specs = swaggerDoc(options);

const app = express();


// env file
dotenv.config();
// bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// port environment
const PORT = process.env.PORT || 3000;

// passport confi
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});



// routes
app.use('/person',personRoutes);
app.use('/menu',menuRoutes); // here we added that authentication middleware

// home route .. swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// initial route
app.get("/",function (req, res) {
  res.send("Hello Welcome to our Restaurant");
});

app.listen(3000,()=>{
  console.log(`Server is listening to ${PORT}`);
});
