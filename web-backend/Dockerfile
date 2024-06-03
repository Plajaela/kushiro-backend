# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

USER root

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Set up the runtime environment
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built code from the first stage
COPY --from=builder /app/build ./dist

# Command to run the application
CMD ["npm","start"]
