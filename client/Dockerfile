FROM node:10

COPY package.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 8080
CMD [ "node", "server" ]