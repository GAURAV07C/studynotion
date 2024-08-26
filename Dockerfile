FROM node:20.16.0

WORKDIR /myapp

COPY  . .

RUN npm install
# RUN npm run dev
CMD [ "npm","run","dev" ]


