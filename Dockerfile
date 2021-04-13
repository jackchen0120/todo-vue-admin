# FROM node:10
# COPY ./ /app
# WORKDIR /app
# RUN npm install && npm run build


# FROM nginx
# RUN mkdir /app
# COPY --from=0 /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf

FROM nginx:1.16.0
RUN mkdir /app
COPY ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf
