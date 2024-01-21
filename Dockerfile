# 1.Create a builder image that has access to the private npm registry, and download the
# application’s dependencies.
# 2.Copy the dependencies from the builder image to the application one, and then throw away
# the builder image and its secrets.

# Docker multistage build
FROM node:20-alpine as builder

WORKDIR /build
COPY package.json ./
COPY package-lock.json ./

ARG NPM_TOKEN
ENV NPM_TOKEN $NPM_TOKEN

RUN npm ci --only=production --ignore-scripts

# starts to build the app image
FROM node:20-alpine

# dumb-init registers signal handlers for every signal that can be caught
RUN apk update && apk add --no-cache dumb-init

# set envs
ENV HOME=/home/app
ENV APP_HOME=$HOME/node/
ENV NODE_ENV=production

# change working dir and copy deps from builder image
WORKDIR $APP_HOME
COPY --chown=node:node . $APP_HOME
COPY --chown=node:node --from=builder /build $APP_HOME

# run app with low permissions level user
USER node

EXPOSE 3000
ENTRYPOINT ["dumb-init"]
CMD ["npm", "start"]
