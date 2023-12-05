var fs = require('fs');

console.log("Advent of code 2023 - Day 4!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function space_split_str_to_int_array(str)
{
    let nums = [];
    str.split(" ").forEach(num => 
        {
            if(num != "")
            {
                let val = parseInt(num);
                nums.push(val);
            }
        });

    return nums;
}

function splitScratchCardData(scratchcard_line)
{
    let first_split = scratchcard_line.split(": ");
    let card_id = first_split[0];

    let numbers_split = first_split[1].split(" | ");
    let winning_str = numbers_split[0];
    let numbers_str = numbers_split[1];

    let winning_numbers = space_split_str_to_int_array(winning_str);
    let my_numbers = space_split_str_to_int_array(numbers_str);;

    return {"id" : card_id, "winning_numbers": winning_numbers, "my_numbers" : my_numbers};
}

function scoreScratchCard(scratchcard)
{
    let score = 0;

    let winners = scratchcard["winning_numbers"];
    let nums = scratchcard["my_numbers"];

    winners.forEach(winning_number => {
        nums.forEach(num => {
            if(num === winning_number)
            {
                if(score === 0)
                {
                    score = 1; // first match gets a point
                }
                else
                {
                    score *= 2; // subsequent matches double the score
                }
            }
        })
    });

    return score;
}


// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

let total_score = 0;
let scratchcards = [];
file_data.forEach(sc =>
    {
        scratchcards.push(splitScratchCardData(sc));
        total_score +=  scoreScratchCard(scratchcards[scratchcards.length - 1]);
    });


console.log("Part 1 answer : " + total_score);
console.log("Part 2 answer : " + 0);
