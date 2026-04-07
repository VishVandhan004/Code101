// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.*;
class Solution {
    public static boolean isAnagram(String s1, String s2){
        s1 = s1.replace("\\s","").toLowerCase();
        s2 = s2.replace("\\s","").toLowerCase();
        if(s1.length() != s2.length()) return false;
        char[] arr1 = s1.toCharArray();
        char[] arr2 = s2.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        return Arrays.equals(arr1,arr2);
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        String str1 = sc.nextLine();
        String str2 = sc.nextLine();
        if(isAnagram(str1,str2)){
            System.out.println("The strings are anagrams");
        }
        else{
            System.out.println("The strings are not anagrams");
        }
    }
}
