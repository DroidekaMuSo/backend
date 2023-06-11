const express = require("express");
const displayRoutes = require("express-routemap");

const userRouter = require("./routes/user.routes");
const petRouter = require("./routes/pets.routes");

const PORT = 5_000;
const BASE_API_PREFIX = "api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(`${__dirname}/public`));
app.get(`/${BASE_API_PREFIX}/alive`, (req,res)=>{
    res.json({message:`Hi, you made your first API and it's being executing`})
})
app.use(`/${BASE_API_PREFIX}/users`, userRouter);
app.use(`/${BASE_API_PREFIX}/pets`, petRouter);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
