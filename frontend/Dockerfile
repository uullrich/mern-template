# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as all_dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

FROM base as build
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
RUN npm run build

FROM base as dev
RUN chown node:node .
COPY --chown=node:node . .
COPY --chown=node:node --from=all_dependencies /usr/src/app/node_modules ./node_modules
USER node
CMD npm run dev

FROM nginxinc/nginx-unprivileged as prod
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]