FROM node:18-alpine
WORKDIR /emedlogixfrontend
ENV PATH="./node_modules/.bin:$PATH"
COPY  . .
RUN npm run build
