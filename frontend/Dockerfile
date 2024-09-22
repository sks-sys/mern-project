# Stage 1: Build
FROM node:18-alpine AS build

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Use Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
