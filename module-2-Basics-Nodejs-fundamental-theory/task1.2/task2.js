/*
Write a program which should do the following:
- Read the content of csvfile from./csvdirectory.
  - Example: https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojsonpackage (https://github.com/Keyang/node-csvtojson) to convert csvfile to jsonobject.
- Write the csvfile content to a new txtfile.
  - Use the following format: https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csvfile into RAM via stream (read/write file content line by line).
- In case of read/write errors, log them in the console.
- The program should be started via npm script using nodemon(i.e. npm run task2).
*/

const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");

const csvFilePath = path.join(__dirname, "..", "csv/nodejs-hw1-ex1.csv");
const textFilePath = path.join(__dirname, "", "nodejs-hw1-ex1.txt");

const readableStream = fs.createReadStream(csvFilePath);
const writableStream = fs.createWriteStream(textFilePath);

readableStream
  .on("error", err => {
    console.log("file error", err);
  })
  .pipe(csv())
  .on("data", data => {
    console.log("Read success:", data.toString("utf8"));
  })
  .on("error", err => {
    console.log("Read error:", err);
  })
  .pipe(writableStream)
  .on("error", err => {
    console.log("Write error:", err);
  })
  .on("finish", () => {
    const completedTxt = "Completed conversion of csv to text.\n";
    console.log(completedTxt);
  });
