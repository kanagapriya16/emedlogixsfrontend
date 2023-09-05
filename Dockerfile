FROM node:18-alpine
WORKDIR /claritui
ENV PATH="/claritui/node_modules/.bin:$PATH"
COPY package.json ./
Copy package.json ./
COPY  . ./
RUN npm run build
EXPOSE 3000
CMD [ "npm","start" ]
