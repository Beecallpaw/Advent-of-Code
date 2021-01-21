use std::collections::HashSet;
use std::fs;

fn solution_one(contents: &String) -> usize {
    let mut set = HashSet::new();
    let mut most_recent = (0, 0);
    set.insert((0, 0));
    for c in contents.chars() {
        match c {
            '^' => most_recent.1 += 1,
            '>' => most_recent.0 += 1,
            '<' => most_recent.0 -= 1,
            'v' => most_recent.1 -= 1,
            _ => continue,
        }
        set.insert(most_recent);
    }
    set.len()
}

fn solution_two(contents: &String) -> usize {
    let mut set = HashSet::new();
    set.insert((0, 0));
    let mut most_recent_x = (0, 0);
    let mut most_recent_y = (0, 0);
    for (i, x) in contents.char_indices() {
        if i % 2 == 0 {
            match x {
                '^' => most_recent_x.1 += 1,
                '>' => most_recent_x.0 += 1,
                '<' => most_recent_x.0 -= 1,
                'v' => most_recent_x.1 -= 1,
                _ => continue,
            }
            set.insert(most_recent_x);
        } else {
            match x {
                '^' => most_recent_y.1 += 1,
                '>' => most_recent_y.0 += 1,
                '<' => most_recent_y.0 -= 1,
                'v' => most_recent_y.1 -= 1,
                _ => continue,
            }
            set.insert(most_recent_y);
        }
    }
    set.len()
}

fn main() {
    let input = fs::read_to_string("input.txt")
        .expect("File should be named `input.txt` and must be present.");
    println!("Solution 1 = {}", solution_one(&input));
    println!("Solution 2 = {}", solution_two(&input));
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn solution_one_test() {
        let test_cases = [
            (String::from(">"), 2),
            (String::from("^>v<"), 4),
            (String::from("^v^v^v^v^v"), 2),
        ];

        for (input, answer) in &test_cases {
            assert_eq!(solution_one(&input), *answer);
        }
    }
    #[test]
    fn solution_two_test() {
        let test_cases = [
            (String::from("^v"), 3),
            (String::from("^>v<"), 3),
            (String::from("^v^v^v^v^v"), 11),
        ];

        for (input, answer) in &test_cases {
            assert_eq!(solution_two(&input), *answer);
        }
    }
}
