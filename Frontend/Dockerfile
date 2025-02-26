# Use Node 20 Alpine as the base image
FROM node:20-alpine

<<<<<<< HEAD
# Set the working directory inside the container
=======
# Build react client
FROM node:20.14.0

# Working directory be app
>>>>>>> main
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package*.json ./

<<<<<<< HEAD
# Install dependencies
RUN npm ci

# Copy the rest of your project files into the container
=======
# copy local files to app folder
>>>>>>> main
COPY . .
###  Installing dependencies

<<<<<<< HEAD
# Expose the port that Vite runs on (default is 3000)
=======
RUN npm install


>>>>>>> main
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
