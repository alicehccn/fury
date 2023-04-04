# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "start"]

EXPOSE 80
EXPOSE 8080
EXPOSE 443
EXPOSE 4000
EXPOSE 5432