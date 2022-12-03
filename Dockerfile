# Base image
FROM node:16.18.1

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install -g http-server
RUN npm install -g pnpm
RUN pnpm i

# Creates a "dist" folder with the production build
RUN pnpm run build

# Start the server using the production build
CMD [ "http-server", "dist" ]
