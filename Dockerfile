FROM node:18.17.1

WORKDIR /var/www/public_html

COPY package.json ./

RUN npm i

COPY . ./

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

RUN npm run start