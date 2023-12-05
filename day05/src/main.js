var fs = require('fs');

console.log("Advent of code 2023 - Day 5!");

let max_mapping = 0;

function read_file(path)
{
    let file_data = String(fs.readFileSync(String(path)));
    let split_data = file_data.split("\n");
    return split_data;
}

function get_seeds(data)
{
    let seeds = [];

    data[0].split(": ")[1].split(" ").forEach(seed_str => {
        seeds.push(parseInt(seed_str));
    });

    return seeds;
}

function raw_map_split(str)
{
    let split_str = str.split(" ");
    return  {
                "d_start": parseInt(split_str[0]),
                "s_start": parseInt(split_str[1]),
                "range": parseInt(split_str[2]),
            };
}

function get_raw_map(data, map_keyword)
{
    let map_out = [];

    let done = false;
    let started = false;
    data.forEach(line =>
        {
            if (!done)
            {
                if(started)
                {
                    if (line === "")
                    {
                        done = true;
                    }
                    else
                    {
                        map_out.push(raw_map_split(line));
                        console.log("LEN: ", map_out.length);
                    }
                }
                else if (line.includes(map_keyword))
                {
                    started = true;
                }
            }
        });

    return map_out;
}

function get_seed_soil_map(data)
{
    return get_raw_map(data, "seed-to-soil");
}

function get_soil_fert_map(data)
{
    return get_raw_map(data, "soil-to-fertilizer");
}

function get_fert_water_map(data)
{
    return get_raw_map(data, "fertilizer-to-water");
}

function get_water_light_map(data)
{
    return get_raw_map(data, "water-to-light");
}

function get_light_temp_map(data)
{
    return get_raw_map(data, "light-to-temperature");
}

function get_temp_humid_map(data)
{
    return get_raw_map(data, "temperature-to-humidity");
}

function get_humid_loc_map(data)
{
    return get_raw_map(data, "humidity-to-location");
}

function interpret_mapping(raw_map)
{
    let mapping = [];

    // Work out maping values
    for (let i = 0; i < max_mapping; i++)
    {
        let map_entry = {"source": i, "destination": i};
        mapping.push(map_entry);
    }

    raw_map.forEach(entry =>
        {
            let src_st  = entry.s_start;
            let rng     = entry.range;
            let dst_st  = entry.d_start;
            let cnt = 0;
            for (let idx = 0; idx < mapping.length; idx++)
            {
                if ((src_st <= mapping[idx].source) && ((src_st + rng) > mapping[idx].source))
                {
                    mapping[idx].destination = dst_st + cnt;
                    cnt++;
                }
            }
        });

    return mapping;
}

function get_destination(map, src)
{
    let dst;

    map.forEach(map_entry =>
        {
            if(src === map_entry.source)
            {
                dst = map_entry.destination;
            }
        })

    return dst;
}

function part1_impl(data)
{
    seeds = get_seeds(file_data);

    console.log("seeds: " + seeds);

    seedsoil_map = interpret_mapping(get_seed_soil_map(file_data));
    // soilfert_map = interpret_mapping(get_soil_fert_map(file_data));
    // fertwater_map = interpret_mapping(get_fert_water_map(file_data));
    // waterlight_map = interpret_mapping(get_water_light_map(file_data));
    // lighttemp_map = interpret_mapping(get_light_temp_map(file_data));
    // temphumid_map = interpret_mapping(get_temp_humid_map(file_data));
    // humidloc_map = interpret_mapping(get_humid_loc_map(file_data));

    let loc_min = max_mapping + 10;

    seeds.forEach(seed => {
        let soil = get_destination(seedsoil_map, seed);
        // let fertilizer = get_destination(soilfert_map, soil);
        // let water = get_destination(fertwater_map, fertilizer);
        // let light = get_destination(waterlight_map, water);
        // let temperature = get_destination(lighttemp_map, light);
        // let humidity = get_destination(temphumid_map, temperature);
        // let location = get_destination(humidloc_map, humidity);
        // console.log("seed: " + seed, soil, fertilizer, water, light, temperature, humidity, location);
        // if (location < loc_min)
        // {
        //     loc_min = location;
        // }
        loc_min = soil;
    });

    return loc_min;
}

function part2_impl(data)
{
    return 0;
}

// Read filename as extra argument
let filename = process.argv[2];

// Read input file
let file_data = read_file(filename);

file_data.forEach(line =>
    {
        if(!line.includes(":"))
        {
            let line_split = line.split(" ");
            if(line_split.length === 3)
            {
                let s = parseInt(line_split[0]);
                let d = parseInt(line_split[1]);

                if(s > d)
                {
                    max_mapping = s;
                }
                else
                {
                    max_mapping = d;
                }
            }
        }
    });


console.log("Part 1 answer : " + part1_impl(file_data));
console.log("Part 2 answer : " + part2_impl(file_data));
