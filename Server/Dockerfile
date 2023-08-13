FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend
COPY package*.json ./
COPY  . .
EXPOSE 4000
CMD [ "npm","start" ]