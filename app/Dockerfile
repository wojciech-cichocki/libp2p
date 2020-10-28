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

# set working directory
WORKDIR /user/src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

#RUN npm install --silent
# RUN npm install
# RUN npm install react-scripts@3.4.3
RUN npm install -g serve

# add app
COPY . ./

# RUN npm run build

EXPOSE 5000

# start app
CMD ["serve", "build", "-s"]