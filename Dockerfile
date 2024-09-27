FROM node:latest
WORKDIR /app
COPY . /app
RUN ls
COPY package.json /app
RUN npm install --save
RUN npm uni bcrypt
RUN npm i bcrypt
CMD ["npm", "start"]