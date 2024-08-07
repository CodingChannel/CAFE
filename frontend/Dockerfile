# Stage 1: Build the React app
FROM node:lts-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package*.json ./
# COPY yarn.lock ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application source code
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve the app using an HTTP server
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

CMD ["npm", "start"]
