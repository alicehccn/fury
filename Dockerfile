# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "start"]

EXPOSE 80
EXPOSE 4000
EXPOSE 5432