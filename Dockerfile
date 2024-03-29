FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt update && \
    apt install -y git
RUN apt install -y python3
RUN apt install -y build-essential

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "script.js" ]

ENV EMAIL="mail@example.com" PASSWORD="password"

