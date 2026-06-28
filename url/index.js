const http = require("http");


const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`)

  console.log(url)
  console.log(url.pathname)
  console.log(url.protocol)
  console.log(url.searchParams.get("name"))


  //  res.write("Todays Topic is URL ") 
  //  res.end()

  // short for above
  res.end("Todays Topic is URL");

})

server.listen(8080, () => console.log("server started"))
