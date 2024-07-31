# Backend Project Setup

## Step 1: Setting up the Project

Navigate to the backend directory in the terminal and run the following command to install the necessary dependencies:

```sh
npm install
```

## Step 2: Setting up Environment Variables

Create a file named `.env` in the backend directory and add the environment variables. 

**Sample contents of the `.env` file:**

> **Note:** Keep the variable names the same as shown below. If you change any variable name, also update the corresponding variable in `index.js`.

```env
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=12345
PG_DATABASE=employeedb
conn_string="eventhub connection string"
svc_conn_string="service bus queue connection string"
STORAGE_CONNECTION_STRING="storage account connection string"
containerName="container name"
```

## Step 3: Starting the Server

To start the backend server, navigate to the backend folder in the terminal and run the following command:

```sh
npm start
```

You can access the web application at [http://localhost:3000](http://localhost:3000). Since the frontend is hosted on the same server, both the frontend and backend can be accessed using `http://localhost:3000`.
