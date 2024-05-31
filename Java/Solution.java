import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the total number of pots: ");
        int n = scanner.nextInt();
        System.out.print("Enter the number of pots with chocolate: ");
        int potWithChocolate = scanner.nextInt();
        scanner.close();

        // Binary search to find the location of the first chocolate
        int left = 1;
        int right = n;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (mid >= potWithChocolate) {
                // The first chocolate is in the left half
                result = mid;
                right = mid - 1;
            } else {
                // The first chocolate is in the right half
                left = mid + 1;
            }
        }

        System.out.println("The location of the first chocolate: " + result);
    }
}
