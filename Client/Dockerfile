FROM node:18-alpine
WORKDIR /emedlogixsfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY . /emedlogixsfrontend/Server
RUN npm run build
EXPOSE 4000
CMD [ "npm","start" ]
