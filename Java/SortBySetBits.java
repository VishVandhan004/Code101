import java.util.*;
public class SortBySetBits {
    public static List<Integer> sortBySetBitCount(int[] arr) {
        int[] bitCounts = new int[33]; // Range of set bit counts is 0 to 32
        for (int num : arr) {
            int setBits = countSetBits(num);
            bitCounts[setBits]++;
        }
        int[] startIndices = new int[33];
        int curr = 0;
        for (int i = 0; i < 33; i++) {
            startIndices[i] = curr;
            curr += bitCounts[i];
        }
        List<Integer> result = new ArrayList<>(arr.length);
        for (int num : arr) {
            int setBits = countSetBits(num);
            int index = startIndices[setBits]++;
            while (index >= result.size()) {
                result.add(null); // Add a placeholder null value
            }
            result.set(index, num); // Set the element at the appropriate index
        }
        return result;
    }
    private static int countSetBits(int n) {
        int count = 0;
        while (n != 0) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        List<Integer> sortedList = sortBySetBitCount(arr);
        System.out.println(sortedList);
    }
}