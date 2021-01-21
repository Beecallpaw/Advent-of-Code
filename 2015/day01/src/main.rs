use std::fs;

fn solution_one(contents: &String) -> isize {
    let mut num: isize = 0;
    for c in contents.chars() {
        match c {
            '(' => num = num + 1,
            ')' => num = num - 1,
            _ => continue,
        }
    }
    num
}

fn solution_two(contents: &String) -> usize {
    let mut num = 0;
    for (i, c) in contents.chars().enumerate() {
        match c {
            '(' => num = num + 1,
            ')' => num = num - 1,
            _ => continue,
        }
        if num == -1 {
            return i + 1;
        }
    }
    0
}

fn main() {
    let input = fs::read_to_string("input.txt")
        .expect("File should be named `input.txt` and must be present.");
    println!(
        "Solution 1 = {} \nSolution 2 = {}",
        solution_one(&input),
        solution_two(&input)
    );
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn soln_one() {
        let test_cases = [
            (String::from(")())())"), -3),
            (String::from("(())"), 0),
            (String::from("(()(()("), 3),
            (String::from("))((((("), 3),
        ];

        for (input, answer) in &test_cases {
            assert_eq!(solution_one(&input), *answer);
        }
    }
    #[test]
    fn soln_two() {
        let test_cases = [
            (String::from(")"), 1),
            (String::from("("), 0),
            (String::from("()())"), 5),
        ];

        for (input, answer) in &test_cases {
            assert_eq!(solution_two(&input), *answer);
        }
    }
}
