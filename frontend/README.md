## Frontend Setup

### Step 1: Setting up the Project

Navigate to the frontend directory in the terminal and run the following command to install the necessary dependencies:

```sh
npm install
```
### Step 2: Setting up Environment Variables

Create a file named `.env` in the backend directory and add the environment variables. 

**Sample contents of the `.env` file:**

> **Note:** Keep the variable names the same as shown below. The value of the variabe needs to be the application URL on which the backend is running 

```env
VITE_APP_API_URL='http://localhost:3000'
```
### Step 3: Starting the Server

To start the frontend server, navigate to the frontend folder in the terminal and run the following command:

```sh
npm run dev
```

You can access the frontend of the web application at [http://localhost:5173](http://localhost:5173).

