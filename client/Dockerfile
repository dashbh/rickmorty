FROM node:10

COPY package.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 3000
CMD [ "node", "server" ]