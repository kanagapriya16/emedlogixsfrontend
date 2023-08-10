FROM node:18-alpine
WORKDIR /emedlogixsfrontend/Server
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]
