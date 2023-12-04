var fs = require('fs');

const GEAR_SYMBOL = "*";

console.log("Advent of code 2023 - Day 3!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function isDigit(char)
{
    return  (char.length === 1) && ('0' <= char) && ('9' >= char);
}

function isPotentiallyAGear(char)
{
    return  (char.length === 1) && (GEAR_SYMBOL === char);
}

function isSymbol(char)
{
    let len_chk = char.length === 1;
    let digit_chk = !isDigit(char);
    let dot_chk = ('.' != char);
    let nl_chk = ('\n' != char);
    let cr_chk = ('\r' != char);

    let combined = len_chk && digit_chk && dot_chk && nl_chk && cr_chk;

    return  combined;
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

let part_sum = 0;
let gear_ratio_sum = 0;
for (let y = 0; y < file_data.length; y++)
{
    let out_str = "";
    let val = 0;
    let add_to_sum = false;

    for(let x = 0; x < file_data[y].length; x++)
    {
        let ch = file_data[y].charAt(x);
        if (isDigit(ch)) // working out part number
        {
            out_str += 'd';
            val = val * 10;
            val += parseInt(ch);
        }
        else
        {
            if(ch === '.')
            {
                out_str += ' ';
            }
            else if(isPotentiallyAGear(ch))
            {
                out_str += 'g';
            }
            else
            {
                out_str += ch;
            }
            
            if (add_to_sum && (0 != val))
            {
                part_sum += val;
            }
            val = 0;
            add_to_sum = false;
            discovered_anew = false;
        }

        // test if a symbol is adjacent to current part
        if(isDigit(ch))
        {
            for (let j = -1; j <= 1; j++)
            {
                for (let i = -1; i <= 1; i++) 
                {
                    let yy = y + j;
                    let xx = x + i;
                    
                    if((xx >= 0) && (yy >= 0) && (xx < file_data[y].length) && (yy < file_data.length))
                    {
                        let test_ch = file_data[yy].charAt(xx);
                        if(isSymbol(test_ch))
                        {
                            add_to_sum = true;
                        }
                    }
                }
            }
        }

        // if it's maybe a gear confirm, by identifying the unique numbers adjacent to it.
        if(isPotentiallyAGear(ch))
        {
            let part_count = 0;
            for (let j = -1; j <= 1; j++)
            {
                let digsFoundNearBy = false;
                for (let i = -1; i <= 1; i++) 
                {
                    let yy = y + j;
                    let xx = x + i;
                    
                    if((xx >= 0) && (yy >= 0) && (xx < file_data[y].length) && (yy < file_data.length))
                    {
                        let test_ch = file_data[yy].charAt(xx);
                        if(isDigit(test_ch))
                        {
                            if(!digsFoundNearBy)
                            {
                                part_count++;
                            }
                            digsFoundNearBy = true;
                        }
                        else 
                        {
                            digsFoundNearBy = false;
                        }
                    }
                }
            }

            if (part_count === 2)
            {
                console.log("!!G!!");
            }
        }
    }
    console.log(out_str);
}

console.log("Part 1 answer : " + part_sum);
console.log("Part 2 answer : " + gear_ratio_sum);