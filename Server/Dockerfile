FROM node:18-alpine AS ui-build
WORKDIR /emedlogixsfrontend/client
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
RUN npm run build

FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrontend
COPY package*.json ./
COPY  . .
EXPOSE 4000
CMD [ "npm","start" ]