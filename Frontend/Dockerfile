# Dockerfile for React client

# Build react client
FROM node:20.14.0

# Working directory be app
WORKDIR /app

COPY package*.json ./

# copy local files to app folder
COPY . .
###  Installing dependencies

RUN npm install


EXPOSE 3000

CMD ["npm","run","dev"]