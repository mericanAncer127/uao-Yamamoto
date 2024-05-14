# Use the official Node.js image as the base image
FROM node:16.20.2

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose port 3000 (the port your frontend server runs on)
EXPOSE 8080

# Start the frontend server
CMD ["npm", "start"]
