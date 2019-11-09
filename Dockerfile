From node:10.16.0

WORKDIR /schedu-client

COPY package*.json /schedu-client/

RUN npm install

CMD ["npm", "start"]
