use std::fs;

fn get_answer(list: &[i32]) -> (i32, i32) {
    let (l, w, h) = (list[0], list[1], list[2]);
    //Part 1
    let (a1, a2, a3) = (l * w, l * h, w * h);
    let paper = 2 * a1 + 2 * a2 + 2 * a3;
    let slack = a1;
    //Part 2
    let bow = l * w * h;
    let area = 2 * l + 2 * w;

    (paper + slack, area + bow)
}

fn solution(contents: &String) -> (i32, i32) {
    let mut total1: i32 = 0;
    let mut total2: i32 = 0;
    for line in contents.lines() {
        let nums: Vec<i32> = line.split("x").map(|s| s.parse::<i32>().unwrap()).collect();
        let mut list = [nums[0], nums[1], nums[2]];
        list.sort();
        let (ans1, ans2) = get_answer(&list);
        total1 += ans1;
        total2 += ans2;
    }

    (total1, total2)
}

fn main() {
    let input = fs::read_to_string("input.txt")
        .expect("File should be named `input.txt` and must be present.");
    println!("(Part1, Part2) = {:?} ", solution(&input));
}

#[cfg(test)]
mod tests {
    use crate::solution;
    #[test]
    fn solution_test() {
        let test_cases = [
            (String::from("2x3x4"), (58, 34)),
            (String::from("1x1x10"), (43, 14)),
        ];

        for (input, answer) in &test_cases {
            assert_eq!(solution(&input), *answer);
        }
    }
}
