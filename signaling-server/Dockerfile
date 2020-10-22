FROM ubuntu:20.04

# steup enviorment
RUN apt update
RUN apt install curl -y
RUN apt install nodejs -y
RUN apt install npm -y

# update node to LTS
RUN npm cache clean -f
RUN npm install -g n
RUN n stable

# Create app directory
WORKDIR /usr/src

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 15555 63785 63786
CMD [ "node", "src/server/index.js" ]