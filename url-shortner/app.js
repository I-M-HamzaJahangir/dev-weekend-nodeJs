const express = require("express")
const app = express()

const urlRouter = require("./routes/url.routes");
const connectDb = require("./config/db");

const PORT = 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb();

app.use("/api/url", urlRouter)




const server = app.listen(PORT, () => console.log("server started"))
server.on("error", (error) => console.log(error))