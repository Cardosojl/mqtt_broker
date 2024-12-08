# mqtt_broker
A simple mqtt broker to deal with subscribers and publishers

[![Author](http://img.shields.io/badge/author-@Cardosojl-blue.svg)](https://www.linkedin.com/in/jorge-luiz-cardoso-215914235/) ![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)


The idea of this project is to be an MQTT server (broker) that handles IoT devices and applications that need to communicate with each other. It registers publishers and subscribers, sending data to subscribers registered in tags where publishers provide these informations.
This project is useful if you want to have smart devices in your home and complete control over them using a local server.


## Features
+ User's passwords go through a password hashing process.
+ MQTT is a lightweight protocol, providing fast communication and consuming few resources from devices.

## Requirements
+ API that handles database interaction (i will provide an Application for it soon and making this requirement optional)

## How to install
### Clone the project to your machine
  ```bash
  git clone https://github.com/Cardosojl/mqtt_broker.git ./mqtt_broker
  ```
### Install the dependencies
  ```bash
  cd mqtt_broker
  npm install
  ```
### Create the environment file
  ```bash
  touch .env
  ```
### Fill in the .env with these informations
1. PORT= (port value the API will run on)
2. HOST= (api host)
3. CLIENT_API= (API that handles with database)
4. LOG_PATH= (Path where the log file will be located)

## How to Use
### Run the application
  ```bash
  npm run build
  npm start
  ```
  

  