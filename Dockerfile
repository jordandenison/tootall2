FROM nodesource/trusty:6.9.1

ADD package.json /opt/app/package.json
ADD npm-shrinkwrap.json /opt/app/npm-shrinkwrap.json

WORKDIR /opt/app
RUN npm i && npm i babel-core babel-cli gulp -g
ADD . /opt/app

ENV PORT 3000
EXPOSE 3000
EXPOSE 3001

CMD gulp
