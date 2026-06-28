const fs =  require("fs")
// fs.writeFileSync("./text.txt", "Hello Sync File")
// fs.writeFile("./asyncFile.txt", "Hello Async file", (error) => { })

// const result = fs.readFileSync("./text.txt", "utf-8")

// fs.readFile("./asyncFile.txt", "utf-8", (err, data) => {
//     if (err) console.log(err)
//     else { console.log(data) }
// })



// console.log(result)

fs.appendFileSync("./text.txt","added new")