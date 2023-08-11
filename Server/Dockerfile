FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrondend/server
COPY package*.json ./
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]