# Use Node 20 Alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your project files into the container
COPY . .
###  Installing dependencies

# Expose the port that Vite runs on (default is 3000)
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
