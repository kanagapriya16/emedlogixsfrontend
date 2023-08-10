FROM node:18-alpine AS server-build
WORKDIR /Server
COPY package*.json ./
RUN npm install
COPY  . .
EXPOSE 4000
CMD [ "node","index.js" ]