const express =  require("express")

const app = express()

app.get("/",(req,res) => res.send("hello from home"))
app.get("/about",(req,res) => res.send("hello from about"))

const server = app.listen(8080, () => {
  console.log("server started on 8000")
})

server.on("error", (err) => {
  console.log(err)
})