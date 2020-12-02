
main = do
    let file = "input1.txt"
    contents <- fmap lines (readFile file)
    let input =  map (\x -> read x :: Int) contents
    print (sumOfTwo input)
    print (sumOfThree input)


sumOfTwo xs = head $ map(\(a,b) -> a*b) $ filter (\(a,b) -> (a+b == 2020)) [(a,b) | a <- xs, b <- xs]


sumOfThree xs = head $ map(\(a,b,c) -> a*b*c) $ filter (\(a,b,c) -> (a+b+c == 2020)) [ (a,b,c) | c <- xs, b <- xs, a <- xs ]
