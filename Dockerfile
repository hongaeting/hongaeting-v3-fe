FROM node:14.4.0 as build

COPY package*.json /

RUN npm install --save-dev

COPY . /

RUN npm run build


FROM nginx

ARG SSL_DIR
ARG SSL_FULL_CHAIN
ARG SSL_CERT
ARG SSL_OPTIONS
ARG SSL_DHPARAMS

RUN rm /usr/share/nginx/html/index.html

COPY --from=build /build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir secrets

COPY ${SSL_DIR}/${SSL_FULL_CHAIN} secrets/
COPY ${SSL_DIR}/${SSL_CERT} secrets/
COPY ${SSL_DIR}/${SSL_OPTIONS} secrets/
COPY ${SSL_DIR}/${SSL_DHPARAMS} secrets/

CMD ["nginx", "-g", "daemon off;"]
