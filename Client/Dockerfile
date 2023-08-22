FROM node:18-alpine 
WORKDIR /emedlogixsfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
WORKDIR /Server
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
EXPOSE 4000
CMD [ "npm","start" ]