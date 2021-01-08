
main = do
    let file = "input1.txt"
    contents <- fmap lines (readFile file)
    let input =  map (\x -> read x :: Int) contents
    print (sumOfTwo input)
    print (sumOfThree input)

sumOfTwo xs = head  [a * b | a <- xs, b <- xs, a + b == 2020]

sumOfThree xs = head [ a * b * c | c <- xs, b <- xs, a <- xs, a + b + c == 2020 ]
