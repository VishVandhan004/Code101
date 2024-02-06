/*Given r red, b blue, and g green balls, find the total number of arrangements
in a row such that no two balls of the same color end up together.
input format : three integers (first integer is for r second is b and last is for g)
output format : integer number

Input:1  2 1
Output:6
The arrangements are [bgbr, bgrb, brbg, brgb, gbrb, rbgb]

Input:  2 3 1
Output:10
The arrangements are [bgbrbr, bgrbrb, brbgbr, brbgrb, brbrbg, brbrgb, 
brgbrb, gbrbrb, rbgbrb, rbrbgb]
*/

import java.util.*;
public class File {
    public static int f(int r, int b, int g, char j, HashMap<String, Integer> memo) {
        String key = r + "" + b + "" + g + "*" + j;
        if (memo.containsKey(key)) {
            return memo.get(key);
        }
        if (r < 0 || b < 0 || g < 0) return 0;
        if (r == 0 && g == 0 && b == 0) return 1;
        int ways = 0;
        if (j == 'r') ways = f(r, b - 1, g, 'b', memo) + f(r, b, g - 1, 'g', memo);
        else if (j == 'b') ways = f(r - 1, b, g, 'r', memo) + f(r, b, g - 1, 'g', memo);
        else if (j == 'g') ways = f(r - 1, b, g, 'r', memo) + f(r, b - 1, g, 'b', memo);
        memo.put(key, ways);
        return ways;
    }
    public static int run(int r, int b, int g) {
        HashMap<String, Integer> memo = new HashMap<>();
        return f(r - 1, b, g, 'r', memo) + f(r, b - 1, g, 'b', memo) + f(r, b, g - 1, 'g', memo);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int b = sc.nextInt();
        int g = sc.nextInt();
        System.out.print(run(r, b, g));
    }
}