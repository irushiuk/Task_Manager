# Use the official Node.js image as the base image
<<<<<<< HEAD
FROM node:20-alpine
=======
FROM node:20.14.0
>>>>>>> main

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
<<<<<<< HEAD
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

=======
COPY . .

# Install dependencies
RUN npm install
>>>>>>> main
# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]