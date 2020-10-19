FROM node:12

# set working directory
WORKDIR /user/src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
#RUN npm install --silent
RUN npm install


RUN npm install react-scripts@3.4.3

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]
