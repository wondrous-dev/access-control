FROM node:16
WORKDIR /usr/src/app
COPY package.json tsconfig.json ./
COPY src ./src
RUN yarn 
RUN yarn run build
EXPOSE 4005
ENTRYPOINT [ "yarn",  "run", "start" ]
