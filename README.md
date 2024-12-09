# mqtt_broker
A simple mqtt broker to deal with subscribers and publishers

[![Author](http://img.shields.io/badge/author-@Cardosojl-blue.svg)](https://www.linkedin.com/in/jorge-luiz-cardoso-215914235/) ![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)

## Overview
The idea of this project is to be an MQTT server (broker) that handles IoT devices and applications that need to communicate with each other. It registers publishers and subscribers, sending data to subscribers registered in tags where publishers provide these informations.
This project is useful if you want to have smart devices in your home and complete control over them using a local server.


### Why use this project
+ Gain full control over your smart home devices with a local server.
+ Ensure secure and efficient communication using the lightweight MQTT protocol.


## Requirements
+ Docker (if you want to run the server through a container). https://www.docker.com/
+ Node.js (if you want to run the server natively). https://nodejs.org
+ ***Optional***: An external API to handle database interactions for authentication (a sample API will be provided soon).


## Getting Started
The server can be run in two ways: using a **Docker container** or **natively**. Choose your preferred method and follow the corresponding instructions below.
### Running with Docker
1. **Clone the repository:**
  ```bash
  git clone https://github.com/Cardosojl/mqtt_broker.git ./mqtt_broker
  ```
2. **Build the Docker image:** (Ensure your user has permission to execute Docker commands.)
  ```bash
  docker buildx build -t mqtt_server .
  ```
3. **Run the container with default settings:**
 ```bash
 docker run -p 1883:1883 --name mqtt_server  mqtt_server
 ```
  Or you can edit the environment variables: ***CLIENT_API*** (URI of an API that handles with database for authentication), ***LOG_PATH*** (path where the log file will be located) ex:
 ```bash
 docker run -p 1883:1883 --name mqtt_server  mqtt_server -e LOG_PATH=/usr/broker/log -e CLIENT_API=http://192.168.0.0:9999
 ```
  > TIP: To manage the server later, use:
 ```
  docker start mqtt_server
  docker logs -f mqtt_server
 ```

  ### Running Natively (Without Docker)
1. **Clone the repository:**
  ```bash
  git clone https://github.com/Cardosojl/mqtt_broker.git ./mqtt_broker
  ```
2. **Install the dependencies:**
  ```bash
  cd mqtt_broker
  npm install
  ```
3. **Create the environment file:**
  ```bash
  touch .env
  ```
4. ***Optional:*** **Fill the .env file to configure environment variables with the following values:**
  ```.env
  PORT=1883             #(port value the API will run on)
  HOST=0.0.0.0          #(api host)
  #CLIENT_API=          #(API that handles with database)
  LOG_PATH=/usr/log     #(Path where the log file will be located)
  ```
> The .env file is not required. The server already has the same values that are filled in the .env example file by default.

> Use the .env file only if you need to override defaults or connect to an external API for authentication.

## Logs
Logs are stored in the path specified by the ```LOG_PATH``` variable. If not customized, the default is ```/usr/log```.

## License
This project is licensed under the MIT License.
  