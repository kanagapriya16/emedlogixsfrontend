FROM node:18-alpine 
WORKDIR /emedlogixsfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
RUN npm run build
WORKDIR /Client/Server
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
EXPOSE 4000
CMD [ "npm","start" ]