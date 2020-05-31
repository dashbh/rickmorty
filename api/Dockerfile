FROM node:10

COPY api/package.json ./

RUN npm install

COPY api/ .

EXPOSE 3001
CMD [ "npm", "start" ]