var fs = require('fs');

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

function isSymbol(char)
{
    let len_chk = char.length === 1;

    return  len_chk && !isDigit(char) && ('.' != char);
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

let part_sum = 0;
for (let y = 0; y < file_data.length; y++)
{
    let out_str = "";
    let val = 0;
    let add_to_sum = false;

    for(let x = 0; x < file_data[y].length; x++)
    {
        let ch = file_data[y].charAt(x);
        if(ch === '.')
        {
            out_str += ' ';
            if (add_to_sum)
            {
                part_sum += val;
            }
            val = 0;
            add_to_sum = false;
        }
        else if (isDigit(ch)) // working out part number
        {
            out_str += 'd';
            val = val * 10;
            val += parseInt(ch);
        }
        else
        {
            out_str += ch;
        }

        // test if a symbol is adjacent to current part
        for (let j = -1; j <= 1; j++)
        {
            for (let i = -1; i <= 1; i++) 
            {
                let yy = y + j;
                let xx = x + i;
                if((xx >= 0) && (yy >= 0) && (xx < file_data[y].length) && (yy < file_data.length))
                {
                    let test_ch = file_data[yy].charAt(xx);
                    console.log('testing: (' + xx + ',' + yy + ') :: [' + test_ch + '] symb?' + isSymbol(test_ch));
                    if(isSymbol(test_ch))
                    {
                        add_to_sum = true;
                    }
                }
            }
        }
    }
    console.log(out_str);
}

console.log("Part 1 answer : " + part_sum);
console.log("Part 2 answer : " + 0);
