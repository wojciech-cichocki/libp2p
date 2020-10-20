FROM ubuntu:20.04
RUN apt update

RUN apt update
RUN apt install curl wget -y
RUN apt install nodejs -y
RUN apt install npm -y

RUN npm cache clean -f
RUN npm install -g n
RUN n stable


#RUN apk add --update git build-base python3 libressl-dev ca-certificates
#RUN apk add libc6-compat


# Create app directory
WORKDIR /usr/src


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
#RUN npm audit fix
RUN export LD_LIBRARY_PATH=/lib64
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 15555 63785 63786
CMD [ "node", "src/server/index.js" ]