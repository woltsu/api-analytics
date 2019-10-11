FROM ubuntu:16.04

WORKDIR /app

RUN apt-get update && apt-get -y upgrade && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs


COPY . .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 8000
CMD npm run prod
