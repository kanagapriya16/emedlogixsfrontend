FROM node:18-alpine AS server-build
Run cd server
WORKDIR /emedlogixsfrondend/cd server
COPY package*.json ./
RUN npm install
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "node","index.js" ]