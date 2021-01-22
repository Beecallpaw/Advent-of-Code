extern crate crypto;

use crypto::digest::Digest;
use crypto::md5::Md5;

fn main() {
    let part1 = solution("yzbqklnj", "00000").unwrap();
    let part2 = solution("yzbqklnj", "000000").unwrap();
    println!("Part1 Solution : {} \nPart2 Solution : {}", part1, part2);
}

fn solution(input: &str, starts_with: &str) -> Option<usize> {
    let mut hash = Md5::new();

    for i in 1.. {
        let data = format!("{}{}", input, i);
        hash.input_str(&data);
        let result = hash.result_str();
        if result.starts_with(starts_with) {
            return Some(i);
        }
        hash.reset();
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn solution_test() {
        let test_cases = [("abcdef", Some(609043)), ("pqrstuv", Some(1048970))];

        for (input, answer) in &test_cases {
            assert_eq!(solution(&input, "00000"), *answer);
        }
    }
}
