FROM node:16-alpine as frontend_build

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN [ "npm", "install"]

COPY . .

RUN [ "npm", "run", "build"]

CMD [ "npm", "start" ]

# FROM backend_build as app_backend  # exemplo: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# COPY --from=backend_build /app/backend/node_modules .
# COPY --from=backend_build /app/backend/build .

# ENTRYPOINT [ "npm", "run", "db:reset"]

# CMD [ "node", "."]
