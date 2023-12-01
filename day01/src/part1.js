var fs = require('fs');

function isCharNumber(c) 
{
    return typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9';
}

console.log("Advent of code 2023 - Day 01 - Part 1!");

// Read filename as extra argument
let filename = process.argv[2];
// console.log("Input File : " + filename);

// Read input file
let file_data = String(fs.readFileSync(filename));
// console.log("File Content :\n" + file_data);

// Split into lines for processing
let cal_data = file_data.split("\n");


let accumulator = 0;
cal_data.forEach((line,idx,arr) =>
{
    if("" != line) // ignore blank lines
    {
        let val = 0;
        let len = line.length;
        let x = 0;
        let y = len;
        let digitFound = false;

        while ((x < len) && !digitFound) // search from the front for first digit...
        {
            digitFound = isCharNumber(line.charAt(x)); 

            if(!digitFound) x++;
        } 

        digitFound = false;
        while ((y > 0) && !digitFound) // search from the back for last digit...
        {
            y--;
            digitFound = isCharNumber(line.charAt(y)); 
        }

        // Combine to make a number
        val = parseInt(line.charAt(x)) * 10;
        val = val + parseInt(line.charAt(y));

        // Sum the calibration values so far...
        accumulator = accumulator + val;
    }
});

console.log("Calibration Sum = " + accumulator);
