FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend/Server
COPY package*.json .
RUN npm install
COPY  . ./
EXPOSE 4000
CMD [ "nodemon","index.js" ]