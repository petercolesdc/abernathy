FROM ubuntu:16.04 AS build-env

# install
RUN apt-get update
RUN apt-get install -y curl bzip2
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs
RUN npm install -g gulp

# app
WORKDIR /app
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
RUN npm install
ADD . /app

# FROM nginx:alpine
# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./.htpasswd /etc/nginx/.htpasswd
# COPY --from=build-env /app/design/public/assets /www/assets
# COPY --from=build-env /app/design/public/css /www/css
# COPY --from=build-env /app/design/public/index.html /www/index.html
