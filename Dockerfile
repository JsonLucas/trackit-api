FROM nest:latest

WORKDIR /var/www/public_html

COPY package.json ./

RUN npm i

COPY . ./

RUN npm run start