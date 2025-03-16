FROM node

WORKDIR /app/backendapp

COPY package.json .

RUN npm install\
        && npm install typescript -g

COPY . /app/backendapp

RUN ["tsc"]

EXPOSE 3000

CMD ["node","./dist/app.js"]