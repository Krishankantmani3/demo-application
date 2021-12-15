# base image
FROM node:14.17.5

# checkout working dir in docker
WORKDIR /client/

# Copy dependency definitions
COPY client/package*.json /client/

# install all packages
RUN npm install

# copy source code to /app/
COPY client/ /client/

RUN npm run build \
    && mkdir -p /runtime/client \
    && cp -R dist/*  /runtime/client 

WORKDIR /server/

# Copy dependency definitions
COPY server/package*.json /server/

# install all packages
RUN npm install

# copy source code to /app/
COPY server/ /server/

RUN npm run build \
    && cp -R dist/*  /runtime/

WORKDIR /runtime

RUN rm -r /client /server

# Serve the app
CMD ["npm", "start"]
