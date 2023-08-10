FROM node:18-alpine
WORKDIR /emedlogixsfrontend
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install
COPY . /emedlogixsfrontend/Server
RUN npm run build
EXPOSE 4000
CMD [ "nodemon","index.js" ]
