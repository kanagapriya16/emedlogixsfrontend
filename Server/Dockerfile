FROM node:18-alpine AS server-build
RUN emedlogixsfrontend
COPY package*.json ./
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]