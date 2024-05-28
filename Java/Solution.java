import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String words = sc.nextLine();
        String order = sc.nextLine();
        System.out.println(sortedWords(words, order));
        // System.out.println(sortedWords("habbit letout", "hlabcdefgijkmnopqrstuvwzxy")); // true
        // System.out.println(sortedWords("hat lad", "hlabcdefgijkmnopqrstuvwzxy")); // false
        // System.out.println(sortedWords("ladder lad", "abcdefghijklmnopqrstuvwzxy")); // false
        // System.out.println(sortedWords("lad ladder", "abcdefghijklmnopqrstuvwzxy")); // true
        // System.out.println(sortedWords("ape apeal bat", "abcdefghijklmnopqrstuvwzxy")); // false
    }

    public static boolean sortedWords(String words, String order) {
        String[] wordArray = words.split(" ");
        for (int i = 0; i < wordArray.length - 1; i++) {
            if (!isSorted(wordArray[i], wordArray[i + 1], order)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isSorted(String word1, String word2, String order) {
        int min = Math.min(word1.length(), word2.length());
        for (int i = 0; i < min; i++) {
            if (order.charAt(word1.charAt(i) - 'a') > order.charAt(word2.charAt(i) - 'a')) {
                return false;
            }
        }
        return true;
    }
}