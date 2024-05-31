// import java.util.*;
// class Solution {
//     static int countbit(int n){
//         int count=0;
//         while(n>0){
//             if((n&1)==1){
//                 count++;
//             }
//             n = n>>1;
//         }
//         return count;
//     }
//     public static int[] sortbin(int[] nums){
//         int k=0;
//         int[] bits = new int[nums.length];
//         for(int i=0;i<nums.length;i++){
//             bits[i] = countbit(nums[i]);
//         }
//         int[] ans = new int[nums.length];
//         for(int i=0;i<=14;i++){
//             for(int j=0;j<bits.length;j++){
//                 if(i==bits[j]){
//                     ans[k++]= nums[j];
//                 }
//             }
//         }
//         return ans;
//     }
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int n = sc.nextInt();
//         int[] nums = new int[n];
//         for(int i=0;i<n;i++){
//             nums[i] = sc.nextInt();
//         }
//         int [] ans = sortbin(nums);
//         System.out.println(Arrays.toString(ans));
//     }
// }
// import java.util.*;
// class Solution
// {
//     static int countOnes(int n)
//     {
//         int count=0;
//         while (n>0)
//         {
//             count+=n%2;
//             n/=2;
//         }
//         return count;
//     }
//     static int[] sortByBinaryOnes(int[] arr) 
//     {
//         int n = arr.length;
//         for (int i=0;i<n-1;i++) 
//         {
//             for (int j=0;j<n-i-1;j++) 
//             {
//                 if (countOnes(arr[j])>countOnes(arr[j + 1])) 
//                 {
//                     int temp = arr[j];
//                     arr[j] = arr[j + 1];
//                     arr[j + 1] = temp;
//                 }
//             }
//         }
//         return arr;
//     }

//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int n = sc.nextInt();
//         int arr[] = new int[n];
//         for (int i = 0; i < n; i++) {
//             arr[i] = sc.nextInt();
//         }
//         Arrays.sort(arr);
//     System.out.println(Arrays.toString(sortByBinaryOnes(arr)));
        
//     }  
// }
import java.util.*;
class MyQueue {
    public Deque<Integer> stack1 = new ArrayDeque<>();
    public Deque<Integer> stack2 = new ArrayDeque<>();

    public void enqueue(int data) {
        stack1.push(data);
    }

    public void dequeue() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        stack2.pop();
    }

    public boolean isempty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }

    public int front() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        if (stack2.isEmpty()) {
            return -1;
        }
        return stack2.peek();
    }

    public Deque<Integer> print() {
        if(!stack1.isEmpty() && !stack2.isEmpty()){
            while(!stack2.isEmpty()) {
                stack1.push(stack2.pop());
            }
            return stack1;
        } else if (!stack1.isEmpty() && stack2.isEmpty()){

            while(!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
            return stack2;
        } else {
            return stack2;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        String com = sc.nextLine();
        String sa [] = com.split(" ");
        MyQueue queue = new MyQueue();
        for (int i = 0; i < sa.length - 1; i++) {
            String method = sa[i];
            int value = Integer.parseInt(sa[i++ + 1]);
            switch(method) {
                case "enqueue" :
                    queue.enqueue(value);
                    break;
                case "dequeue" :
                    queue.dequeue();
                    break;
                case "isempty" :
                    System.out.println(queue.isempty());
                    return;
                    // break;
                case "front" :
                    System.out.println(queue.front());
                    return;
                    // break;
            }
        }
        System.out.println(queue.print());
        // System.out.println(queue.stack1);
    }
}