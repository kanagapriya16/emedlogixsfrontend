FROM node:18-alpine AS ui-build
WORKDIR /emedlogixsfrontend/Client
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install
COPY package*.json ./
COPY  . .
RUN npm run build

