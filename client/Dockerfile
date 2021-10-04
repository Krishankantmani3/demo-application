#base image
FROM node:10

#checkout working dir in docker
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# install all packages
RUN npm install

# copy source code to /app/
COPY . /app/

# Serve the app
CMD ["npm", "start"]
