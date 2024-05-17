import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        char[] ch = str.toCharArray();
        
        int left = 0, right = str.length() - 1;
        
        // Two-pointer approach to reverse vowels
        while (left < right) {
            // Move left pointer to the next vowel
            while (left < right && !isVowel(ch[left])) {
                left++;
            }
            // Move right pointer to the previous vowel
            while (left < right && !isVowel(ch[right])) {
                right--;
            }
            // Swap the vowels
            if (left < right) {
                char temp = ch[left];
                ch[left] = ch[right];
                ch[right] = temp;
                left++;
                right--;
            }
        }
        
        // Convert the character array back to a string and print the result
        System.out.println(new String(ch));
    }

    // Helper function to check if a character is a vowel
    private static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
