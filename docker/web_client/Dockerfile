FROM node:10

RUN mkdir /root/webapp
WORKDIR /root/webapp
#COPY ./web_client /home/node/webapp
COPY ./web_client/package*.json ./
RUN npm install

# Entrypoint
COPY ./docker/web_client/docker-entrypoint.sh /
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
