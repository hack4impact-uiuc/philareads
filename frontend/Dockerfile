FROM node:alpine as build
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./philareads.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
