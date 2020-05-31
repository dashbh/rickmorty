FROM node:10

COPY client/package.json ./

RUN npm install
RUN npm build

COPY client/ .

EXPOSE 8080
CMD [ "node", "server" ]