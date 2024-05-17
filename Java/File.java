import java.util.*;
class File {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        double x = sc.nextDouble();
        int n = sc.nextInt();
        System.out.println(String.format("%.5f",power(x,n)));
    }
    public static double power(double x, int n){
        // double val=1.00000;
        if(n==0){
            return 1;
        }
        if(n<0){
            return (1/x*power(x,n+1));
        }
        return x*power(x,n-1);
    }
}