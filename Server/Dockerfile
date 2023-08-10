FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend
COPY package*.json ./
RUN npm install
COPY  . .
EXPOSE 4000
CMD [ "node","index.js" ]