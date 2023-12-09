import mysql.connector

# Replace these values with your actual MySQL connection details
host = 'localhost'
user = 'root'
password = '#success_17@wow'
database = 'quiz'
port = 3306

# Establish a connection to the MySQL server
try:
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=3306
    )

    if connection.is_connected():
        print("Connected to MySQL database")

        # Perform database operations here

except mysql.connector.Error as e:
    print(f"Error: {e}")

finally:
    # Close the connection in the finally block to ensure it happens
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("Connection closed")