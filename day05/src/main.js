var fs = require('fs');

console.log("Advent of code 2023 - Day 5!");

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path), 'utf-8'));
    let split_data = file_data.split("\r\n");
    return split_data;
}

function split_input_file(input)
{
    let seeds_list = [];
    let map_builder = {"name": "", "data": []};

    let outputs = [];

    for (let idx = 0; idx < input.length; idx++)
    {
        if (input[idx].includes("seeds: "))
        {
            // these are the seeds...
            let stripped_str = input[idx].replace("seeds: " , "");
            stripped_str.split(" ").forEach(v =>
                {
                    seeds_list.push(parseInt(v));
                })
        }
        else if(input[idx].includes(" map:"))
        {
            if(0 != map_builder.data.length)
            {
                // console.log("SEEDS: ", seeds_list);
                // console.log("MAP: ", map_builder);
                outputs = [];

                seeds_list.forEach(seed => {
                        let out = seed;

                        map_builder.data.forEach(seed_map =>
                            {
                                if ((seed >= seed_map.s) && (seed < (seed_map.s + seed_map.r))) // if within range
                                {
                                    let diff = seed - seed_map.s;
                                    out = seed_map.d + diff;
                                }
                            });
                        
                        outputs.push(out);
                    });

                // console.log("OUT: ", outputs);
                // console.log("===---###---===");

                seeds_list = outputs;

                map_builder.name = input[idx].replace(" map:", "");
                // console.log(map_builder.name);
                map_builder.data = [];
            }
        }
        else
        {
            let split_line = input[idx].split(" ");
            let dest = parseInt(split_line[0]);
            let source = parseInt(split_line[1]);
            let range = parseInt(split_line[2]);

            map_builder["data"].push({"s":source,"d":dest,"r":range});
        }
    }

    // console.log("SEEDS: ", seeds_list);
    // console.log("MAP: ", map_builder);
    outputs = [];

    seeds_list.forEach(seed => {
            let out = seed;

            map_builder.data.forEach(seed_map =>
                {
                    if ((seed >= seed_map.s) && (seed < (seed_map.s + seed_map.r))) // if within range
                    {
                        let diff = seed - seed_map.s;
                        out = seed_map.d + diff;
                    }
                });
            
            outputs.push(out);
        });

    return outputs;
}

function split_input_file_p2(input)
{
    let seeds_list = [];
    let map_builder = {"name": "", "data": []};

    let outputs = [];

    for (let idx = 0; idx < input.length; idx++)
    {
        if (input[idx].includes("seeds: "))
        {
            // these are the seeds...
            let stripped_str = input[idx].replace("seeds: " , "");
            let split_stripped = stripped_str.split(" ");
            let seed_start = NaN;
            for (let i = 0; i < (split_stripped.length / 2); i++)
            {
                seed_start = parseInt(split_stripped[i * 2]);
                
                for (let cnt = 0; cnt < parseInt(split_stripped[(i * 2) + 1]); cnt++) {
                    seeds_list.push(seed_start + cnt);
                }
            }
            // console.log("P2 SEEDS: ", seeds_list, " COUNT=",seeds_list.length);
        }
        else if(input[idx].includes(" map:"))
        {
            if(map_builder.data.length > 0)
            {
                console.log("SEEDS: ", seeds_list);
                console.log("MAP: ", map_builder);
                outputs = [];

                seeds_list.forEach(seed => {
                    let out = seed;

                    map_builder.data.forEach(seed_map =>
                        {
                            if ((seed >= seed_map.s) && (seed < (seed_map.s + seed_map.r))) // if within range
                            {
                                let diff = seed - seed_map.s;
                                out = seed_map.d + diff;
                            }
                        });
                    
                    outputs.push(out);

                });

                console.log("OUT: ", outputs);
                console.log("===---###---===");

                seeds_list = outputs;
                map_builder.name = input[idx].replace(" map:", "");
                map_builder.data = [];
            }
        }
        else
        {
            if(input[idx].length > 0)
            {
                let split_line = input[idx].split(" ");
            
                let dest = parseInt(split_line[0]);
                let source = parseInt(split_line[1]);
                let range = parseInt(split_line[2]);

                console.log({"s":source,"d":dest,"r":range});

                map_builder["data"].push({"s":source,"d":dest,"r":range});
            }
        }
    }

    console.log("SEEDS: ", seeds_list);
    console.log("MAP: ", map_builder);
    outputs = [];

    seeds_list.forEach(seed => {
        let out = seed;

        map_builder.data.forEach(seed_map =>
            {
                if ((seed >= seed_map.s) && (seed < (seed_map.s + seed_map.r))) // if within range
                {
                    let diff = seed - seed_map.s;
                    out = seed_map.d + diff;
                }
            });
        
        outputs.push(out);

    });

    console.log("OUT: ", outputs);
    console.log("===---###---===");

    return outputs;
}

function part1_impl(data)
{
    organised_data = split_input_file(data);

    // console.log(organised_data)

    let min_value = NaN;
    organised_data.forEach(value =>
        {
            if (isNaN(min_value))
            {
                min_value = value;
            }
            else
            {
                if(value < min_value)
                {
                    min_value = value;
                }
            }
        });

    return min_value;
}

function part2_impl(data)
{
    organised_data = split_input_file_p2(data);

    // console.log(organised_data)

    let min_value = NaN;
    organised_data.forEach(value =>
        {
            if (isNaN(min_value))
            {
                min_value = value;
            }
            else
            {
                if(value < min_value)
                {
                    min_value = value;
                }
            }
        });

    return min_value;
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

console.log("Part 1 answer : " + part1_impl(file_data));
console.log("Part 2 answer : " + part2_impl(file_data));
