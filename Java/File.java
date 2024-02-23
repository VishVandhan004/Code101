import java.util.*;
class File{
public static void main(String args[]){
    Scanner sc = new Scanner(System.in);
    int row = sc.nextInt();
    int col = sc.nextInt();
    int count = 0;
    int arr[][] = new int[row][col];
    for(int i=0;i<row;i++){
        for(int j=0;j<col;j++){
            arr[i][j] = sc.nextInt();
        }
    }
    if(row==col){
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                    if(arr[i][i] == arr[j][j]){
                          count++;
                    }
                }
            }
    }
    else{
        System.out.println("0");
    }
    if(count == 0){
        System.out.println("0");
    }
    System.out.println(count);
 }
}