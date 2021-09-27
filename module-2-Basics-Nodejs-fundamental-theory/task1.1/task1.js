/*
Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.
- The program should be started from npm script via nodemon(i.e. npm run task1).
- The program should be running in a stand-by mode and should not be terminated after the first-stringprocessing.
- For example:
> 12345 678
> 876 54321

> test data
> atad tset
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on("line", line => {
  console.log(line.split("").reverse().join(""));
});
