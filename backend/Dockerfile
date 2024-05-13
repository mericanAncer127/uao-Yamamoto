FROM node:16.20.2

WORKDIR /usr/local/share/backend

COPY package*.json ./
RUN npm install --force
COPY . .

EXPOSE 5000

CMD npm start
