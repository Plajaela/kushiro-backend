# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the build output from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Command to run the application
CMD ["npm", "start"]
