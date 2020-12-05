import Data.List.Split

main = do
    let file = "input2.txt"
    contents <- fmap lines (readFile file)
    print $ length $ isValid contents
    print $ length $ isValid2 contents

data Password = Password {
    min:: String,
    max:: String,
    letter:: Char,
    value:: String
}

parsePassword :: String -> Password
parsePassword p = Password mn mx l v
        where letters = words p
              ([mn, mx]) = splitOn ("-") (letters !! 0)
              l = head (letters !! 1)
              v = letters !! 2

filterPswd :: Password -> Bool
filterPswd (Password a b c d) = count >= (read a) && count <= (read b)
    where count = length $ filter(==c) d

isValid :: [String] -> [Password]
isValid passwords = filter filterPswd $ map parsePassword passwords

isValid2 :: [String] -> [Password]
isValid2 passwords = filter filterPswd2 $ map parsePassword passwords

filterPswd2 :: Password -> Bool
filterPswd2 (Password a b c d) = (d !! ((read a) - 1) == c) /= (d !! ((read b) -1) == c)



