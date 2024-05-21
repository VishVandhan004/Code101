import java.util.*;
class File {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.nextLine();
        String s2 = sc.nextLine();
        System.err.println(check(s1,s2));
    }

public static boolean check(String s1, String s2){
    int len1 = s1.length();
    int len2 = s2.length();
    if(len1 != len2){
        return false;
    }
    if(len1 == len2){
        for(int i=0;i<len1;i++){
            for(int j=0;j<len2;j++){
                if(s1.charAt(i)==s2.charAt(j)){
                    return false;
                }
            }
        }
    }
    return true; 
    }
}