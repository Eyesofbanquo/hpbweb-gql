FROM public.ecr.aws/lambda/nodejs:12

# WORKDIR /app

# RUN npm install typescript

# COPY ["package.json", "."]

# RUN npm install

# ADD ["index.ts", "tsconfig.json", "./"]

# CMD ["npm", "run", "launch"]

COPY ["package.json", "index.ts", "tsconfig.json", ".npmrc", "./"]

COPY ["api/", "./api"]

RUN npm install -g typescript

RUN npm install

RUN npm run tsc

CMD ["./dist/index.handler"]