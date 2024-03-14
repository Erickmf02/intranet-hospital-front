FROM node:21-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "dev"]
