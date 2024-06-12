// import java.util.Scanner;
// public class Solution {
//     public static boolean checkInclusion(String str1, String str2) {
//         int CHAR_COUNT = 128; // Number of ASCII characters
//         // Lengths of the strings
//         int len1 = str1.length();
//         int len2 = str2.length();
//         // Early exit if str1 is longer than str2
//         if (len1 > len2) {
//             return false;
//         }
//         // Frequency arrays
//         int[] count1 = new int[CHAR_COUNT];
//         int[] count2 = new int[CHAR_COUNT];
//         // Populate the frequency array for str1 and the first window of str2
//         for (int i = 0; i < len1; i++) {
//             count1[str1.charAt(i)]++;
//             count2[str2.charAt(i)]++;
//         }
//         // Compare the frequency arrays of the first window
//         if (matches(count1, count2)) {
//             return true;
//         }
//         // Slide the window over str2
//         for (int i = len1; i < len2; i++) {
//             count2[str2.charAt(i)]++; // Add new character to the window
//             count2[str2.charAt(i - len1)]--; // Remove the character going out of the window
//             // Compare the frequency arrays
//             if (matches(count1, count2)) {
//                 return true;
//             }
//         }
//         return false;
//     }
//     public static boolean matches(int[] count1, int[] count2) {
//         for (int i = 0; i < count1.length; i++) {
//             if (count1[i] != count2[i]) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);
//         String str1 = scanner.next();
//         String str2 = scanner.next();
//         boolean result = checkInclusion(str1, str2);
//         System.out.println(result);
//     }
// }
// import java.util.*;
// class Soluiton
// {
//     static boolean isPresent(String key,String str)
//     {
//         char target[]=key.toCharArray();
//         int sum=0;
//         for(char c:target)
//         {
//             sum+=(int)c;
//         }
//         for(int i=1;i<str.length()-1;i++)
//         {
//             if((int)str.charAt(i-1)+(int)str.charAt(i)+(int)str.charAt(i+1)==sum)
//             {
//                 return true;
//             }
//         }
//         return false;
//     }
//     public static void main (String[] args)
//     {
//         Scanner sc=new Scanner(System.in);
//         String key=sc.next();
//         String str=sc.next();
//         System.out.println(isPresent(key,str));
//     }
// }

import java.util.*;
class Solution {
    public static int nways(int n){
        int step=0;
        if(step==0) return 0;
        if(step>n) return 0;
        if(step==n) return 1;
        int onestep = nways(step+1);
        int twostep = nways(step+2);
        return onestep+twostep;
    }
    // public static long steps(int n){
    //     long arr[] = new long[n+1];
    //     if(n==0){
    //         return 0;
    //     }
    //     else if(n==1){
    //         return 1;
    //     }
    //     else{
    //         arr[0]=1;
    //         arr[1]=1;
    //     for(int i=2;i<=n;i++){
    //         arr[i] = arr[i-1]+arr[i-2];
    //     }
    //  }
//  return arr[n];
//}
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(nways(n));
    }
}