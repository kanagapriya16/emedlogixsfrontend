FROM node:18-alpine AS server-build
RUN /emedlogixsfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY package*.json ./
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]