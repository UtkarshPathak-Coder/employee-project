# Use a prebuilt Node.js image (Alpine version)
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (if using Yarn) to the container
COPY package.json ./

# Install dependencies and clean up
RUN npm install

# Copy the rest of your application files
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]
