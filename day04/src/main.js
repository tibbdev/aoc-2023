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

    return {"id" : card_id, "winning_numbers": winning_numbers, "my_numbers" : my_numbers, "copies" : 1};
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

function count_matches(winners, nums)
{
    let match_cnt = 0;
    winners.forEach(value =>
        {
            nums.forEach(num =>
                {
                    if (value === num)
                    {
                        match_cnt++;
                    }
                });
        });
    return match_cnt;
}

function part1_impl(scratchcards)
{
    let total_score = 0;

    scratchcards.forEach(card => {
        total_score += scoreScratchCard(card);
    })

    return total_score;
}

function part2_impl(scratchcards)
{
    let card_count = 0;

    for(let idx = 0; scratchcards.length > idx; idx++)
    {
        let copies = scratchcards[idx].copies;
        let matches = count_matches(scratchcards[idx].winning_numbers, scratchcards[idx].my_numbers);
        for(;copies > 0; copies--)
        {
            for(let idxi = idx; (idx + matches) > idxi; idxi++)
            {
                scratchcards[idxi + 1].copies++;
            }
        }
    }

    for(let idx = 0; scratchcards.length > idx; idx++)
    {
        card_count += scratchcards[idx].copies;
    }

    return card_count;
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

let scratchcards = [];
file_data.forEach(sc =>
    {
        scratchcards.push(splitScratchCardData(sc));
    });

console.log("Part 1 answer : " + part1_impl(scratchcards));
console.log("Part 2 answer : " + part2_impl(scratchcards));
