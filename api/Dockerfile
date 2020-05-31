FROM node:10

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]