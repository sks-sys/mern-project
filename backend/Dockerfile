# Stage 1: Build
FROM node:18-alpine AS build

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Stage 2: Production
FROM node:18-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
