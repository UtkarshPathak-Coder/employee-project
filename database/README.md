
# PostgreSQL Setup

## Step 1: Install PostgreSQL

If you don't already have PostgreSQL installed, download and install it from the official website: [PostgreSQL Downloads](https://www.postgresql.org/download/)

## Step 2: Create the Database

### Step 2.1: Access PostgreSQL Command Line

Open your terminal or command prompt and access the PostgreSQL command line by typing:

```sh
psql -U postgres
```

You may be prompted to enter your PostgreSQL password.

### Step 2.2: Create the Database

Once you are in the PostgreSQL command line interface, create a new database by running the following command:

```sql
CREATE DATABASE employeedb;
```

## Step 3: Create the Database User

Create a new user and grant privileges to the new database. Run the following commands:

```sql
CREATE USER postgres WITH PASSWORD '12345';
GRANT ALL PRIVILEGES ON DATABASE employeedb TO postgres;
```

## Step 4: Initialize the Database

### Step 4.1: Open the Query Tool

Open the PostgreSQL query tool. You can do this via pgAdmin or any other PostgreSQL client you prefer.

### Step 4.2: Run the Initialization Script

Copy the contents of the `init.sql` file and paste them into the query tool. Then, execute the script to set up your initial database schema and data.

## Step 5: Verify the Setup

You can verify the database setup by running a few basic SQL commands to ensure that your tables and data have been created correctly.

