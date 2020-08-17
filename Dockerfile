FROM node:12-slim as builder
WORKDIR /app
COPY . .
RUN npm install --quiet
RUN npm run build

FROM nginx:1.19-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/devops-webapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
