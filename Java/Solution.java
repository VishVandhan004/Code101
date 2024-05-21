import java.util.*;
class Solution {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fuel(n));
    }
    public static int fuel(int n){
        int count=0;
        if(n==0){
            return 0;
        }
        if(n==1){
            count++;
        }
        else{
            count = fuel(n/2)+(n%2);
        }
        return count;
    }
}