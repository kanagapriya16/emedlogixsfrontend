FROM node:18-alpine AS server-build
WORKDIR /emedlogixsfrondend
COPY Server/package*.json ./
RUN npm install
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]