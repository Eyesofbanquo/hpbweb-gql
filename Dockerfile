FROM node:15-alpine

WORKDIR /app

RUN npm install typescript

COPY ["package.json", "."]

RUN npm install

ADD ["index.ts", "tsconfig.json", "./"]

CMD ["npm", "run", "launch"]