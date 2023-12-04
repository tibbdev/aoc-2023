var fs = require('fs');

function isCharNumber(c) 
{
    return typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9';
}

console.log("Advent of code 2023 - Day 01 - Part 2!");

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
        let first = "x";
        let last = "y";
        let first_at = line.length - 1;
        let last_at = 0;
        let find_me = 1;
        let val = 0;
        let len = line.length;

        while (10 > find_me)
        {
            let line_new = line;

            if(1 == find_me)
            {
                line_new = line.replace(/one/g, "1");
            }
            else if (2 == find_me)
            {
                line_new = line.replace(/two/g, "2");
            }
            else if (3 == find_me)
            {
                line_new = line.replace(/three/g, "3");
            }
            else if (4 == find_me)
            {
                line_new = line.replace(/four/g, "4");
            }
            else if (5 == find_me)
            {
                line_new = line.replace(/five/g, "5");
            }
            else if (6 == find_me)
            {
                line_new = line.replace(/six/g, "6");
            }
            else if (7 == find_me)
            {
                line_new = line.replace(/seven/g, "7");
            }
            else if (8 == find_me)
            {
                line_new = line.replace(/eight/g, "8");
            }
            else if (9 == find_me)
            {
                line_new = line.replace(/nine/g, "9");
            }

            let x = 0;
            let y = len;
            let digitFound = false;

            while ((x < len) && !digitFound) // search from the front for first digit...
            {
                digitFound = isCharNumber(line_new.charAt(x)); 

                if(!digitFound) x++;
            } 
            if(first_at > x)
            {
                first_at = x;
                first = line_new.charAt(x);
            }

            digitFound = false;
            while ((y > 0) && !digitFound) // search from the back for last digit...
            {
                y--;
                digitFound = isCharNumber(line_new.charAt(y)); 
            }

            let last_ratio = y / line_new.length;

            if(last_at < last_ratio)
            {
                last_at = last_ratio;
                last = line_new.charAt(y);
            }

            // console.log(find_me + ": " + line + " => " + line_new);
            find_me++;    
        }

        if(!isCharNumber(first))
        {
            console.log("ERR:first is zero at line: " + idx + " was " + first);
            first = 0;
        }
        else
        {
            first = parseInt(first);
        }

        if(!isCharNumber(last))
        {
            console.log("ERR:last is zero at line: " + idx + " was " + last);
            last = 0;
        }
        else
        {
            first = parseInt(first);
        }

        // Combine to make a number
        val = parseInt(first) * 10.0;
        val = parseInt(val) + parseInt(last);
        // console.log("vals: " + first + ";" + last + " val="+val);

        // Sum the calibration values so far...
        accumulator = accumulator + val;
    }
});

console.log("Calibration Sum = " + accumulator);
