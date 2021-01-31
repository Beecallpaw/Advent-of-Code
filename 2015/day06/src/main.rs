use regex::Regex;
use std::collections::HashMap;
use std::fs;

fn solution(input: &str) -> (usize, usize) {
    let mut my_map = HashMap::new();
    let mut my_map2 = HashMap::new();
    let re = Regex::new(r"(.*) (\d+),(\d+) through (\d+),(\d+)").unwrap();
    for row in input.lines() {
        for cap in re.captures_iter(row) {
            let x0 = cap[2].parse::<usize>().unwrap();
            let y0 = cap[3].parse::<usize>().unwrap();
            let x1 = cap[4].parse::<usize>().unwrap();
            let y1 = cap[5].parse::<usize>().unwrap();
            for i in x0..=x1 {
                for j in y0..=y1 {
                    let index = (i, j);
                    let val = my_map.entry(index).or_insert(false);
                    let val2 = my_map2.entry(index).or_insert(0);
                    match &cap[1] {
                        "turn on" => {
                            *val = true;
                            *val2 += 1;
                        }
                        "turn off" => {
                            *val = false;
                            if *val2 > 0 {
                                *val2 -= 1;
                            }
                        }
                        "toggle" => {
                            *val = !*val;
                            *val2 += 2;
                        }
                        _ => unreachable!("Not Reachable"),
                    }
                }
            }
        }
    }
    (
        my_map.values().filter(|&v| *v == true).count(),
        my_map2.values().sum(),
    )
}

fn main() {
    let input = fs::read_to_string("input.txt")
        .expect("File should be named `input.txt` and must be present.");
    println!("(Part 1, Part2) = {:?} ", solution(&input));
}

#[cfg(test)]
mod tests {
    use crate::solution;
    #[test]
    fn solution_test_2() {
        let test_cases = [
            (
                String::from("toggle 0,0 through 999,999"),
                (1_000_000, 2000000),
            ),
            (String::from("turn on 0,0 through 0,0"), (1, 1)),
        ];
        for (input, answer) in &test_cases {
            assert_eq!(solution(&input), *answer);
        }
    }
}
