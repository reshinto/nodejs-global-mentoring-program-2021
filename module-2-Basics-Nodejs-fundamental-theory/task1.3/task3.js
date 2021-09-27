/*
Rewrite task1.1 and task1.2 programs to use babel(https://babeljs.io/) and ES6modules.
*/

import csv from "csvtojson";
import path from "path";
import fs from "fs";
import readline from "readline";

const csvFilePath = path.join(__dirname, "..", "csv/nodejs-hw1-ex1.csv");
const textFilePath = path.join(__dirname, "", "nodejs-hw1-ex1.txt");

const readableStream = fs.createReadStream(csvFilePath);
const writableStream = fs.createWriteStream(textFilePath);

function convertCsvToText() {
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
      const reverseStrTxt =
        "Started reverse string from standard input feature:";
      console.log(completedTxt);
      console.log("_".repeat(reverseStrTxt.length));
      console.log(reverseStrTxt);
    });
}

function reverseStringFromStandardInput() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  rl.on("line", line => {
    console.log(line.split("").reverse().join(""));
  });
}

function run() {
  convertCsvToText();
  reverseStringFromStandardInput();
}

run();
