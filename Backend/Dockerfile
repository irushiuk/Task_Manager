# Use the official Node.js image as the base image
FROM node:20.14.0

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install
# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]