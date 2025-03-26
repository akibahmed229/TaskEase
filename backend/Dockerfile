# build the image
# docker build -t taskease_backen .
# run the image
# docker run -p 8000:8000 taskease_backen

FROM node:20

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]

