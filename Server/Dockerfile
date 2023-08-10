FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend/Client/server
COPY package*.json ./
RUN npm install
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "node","index.js" ]