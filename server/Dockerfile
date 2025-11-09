FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose API port
EXPOSE 5000

# Start backend server
CMD ["node", "app.js"]
