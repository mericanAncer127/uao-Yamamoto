# Use the official Node.js image as the base image
FROM node:16.20.2

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose port 5000 (the port your backend server runs on)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
