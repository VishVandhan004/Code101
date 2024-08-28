import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;
public class Solution {
public static void main(String[] args) {
try (Scanner scanner = new Scanner(System.in)) { // Automatically closes Scanner
// Get the hostname from the user
System.out.print("Enter Hostname to Lookup: ");
String hostname = scanner.nextLine();
// Perform DNS query
InetAddress ipAddress = InetAddress.getByName(hostname);
// Display the result
System.out.println("IP Address for " + hostname + ": " + ipAddress.getHostAddress());
} catch (UnknownHostException e) {
System.out.println("DNS resolution failed: " + e.getMessage());
}
}
}