FROM node:20.1.0-alpine as build

ARG WORK_DIR=/frontendnew
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}
COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli
RUN npm install

COPY . ${WORK_DIR}--exclude-from=.dockerignore

EXPOSE 4200

CMD ng serve --host 0.0.0.0
