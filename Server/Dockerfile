FROM node:18-alpine 
WORKDIR /emedlogixsfrontend/Client
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
RUN npm run build

WORKDIR /emedlogixsfrontend/Server
COPY package*.json ./
COPY  . .
EXPOSE 4000
CMD [ "npm","start" ]