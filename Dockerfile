FROM node:20.9.0

WORKDIR /usr/broker

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1883

CMD ["npm", "start"]
