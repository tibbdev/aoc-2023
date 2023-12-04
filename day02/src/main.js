var fs = require('fs');

const RED_MAX   = 12;
const GREEN_MAX = 13;
const BLUE_MAX  = 14;

let id_acc = 0;

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function split_game_data(data_line)
{
    let blue_max = 0;
    let red_max = 0;
    let green_max = 0;

    // Split data into "Game ID; Game Data"
    let first_split = data_line.split(": ");

    // Get the game ID as a number
    let id_split = first_split[0].split(" ");
    let game_id = parseInt(id_split[1]);

    // Split the game into it's rounds
    let rounds_split = first_split[1].split("; ");
    rounds_split.forEach(round => {
        // Process the data for each set of cubes
        round.split(", ").forEach(cube_info => {
            let cube_split = cube_info.split(" ");
            let cube_cnt = parseInt(cube_split[0]);
            if (cube_info.includes("red"))
            {
                if(cube_cnt > red_max)
                {
                    red_max = cube_cnt;
                }
            }
            else if (cube_info.includes("green"))
            {
                if(cube_cnt > green_max)
                {
                    green_max = cube_cnt;
                }
            }
            else if (cube_info.includes("blue"))
            {
                if(cube_cnt > blue_max)
                {
                    blue_max = cube_cnt;
                }
            }
        });
    });

    return [game_id, red_max, green_max, blue_max ];
}

function is_game_possible(game_info)
{
    return (game_info[1] <= RED_MAX) && (game_info[2] <= GREEN_MAX) && (game_info[3] <= BLUE_MAX);
}

function calculate_game_power(game_info)
{
    return game_info[1] * game_info[2] * game_info[3];
}

console.log("Advent of code 2023 - Day 2!");

// Read filename as extra argument
let filename = process.argv[2];
// console.log("Input File : " + filename);

// Read input file
let file_data = read_file(filename);
let games = [];
file_data.forEach(element => {
    if(element != "") // skip blank lines
    {
        let game_data = split_game_data(element);
        games.push(game_data);
        if(is_game_possible(game_data))
        {
            id_acc += game_data[0];
        }
    }
});

let total_power = 0;
games.forEach(game =>
    {
        let game_power = calculate_game_power(game);
        total_power += game_power;
    })

console.log("Part 1 answer : " + id_acc);
console.log("Part 2 answer : " + total_power);
