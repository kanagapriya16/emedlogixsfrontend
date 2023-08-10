FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend/Server
COPY package*.json ./
RUN npm install
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "nodemon","index.js" ]