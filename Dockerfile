FROM node:14.4.0 as build

COPY package*.json /

RUN npm install --save-dev

COPY . /

RUN npm run build


FROM nginx

RUN rm /usr/share/nginx/html/index.html

COPY --from=build /build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
