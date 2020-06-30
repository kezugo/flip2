FROM node:12.8-slim

RUN apt update && apt -y install procps bzip2 build-essential chrpath libssl-dev libxft-dev libfreetype6 libfreetype6-dev \
    libfontconfig1 libfontconfig1-dev cron

COPY ./docker/users/entrypoint.sh /

WORKDIR /app

ADD . /app

RUN npm install -g yarn @nestjs/cli
RUN yarn install

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]