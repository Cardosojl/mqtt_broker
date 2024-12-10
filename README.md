# mqtt_broker
A simple MQTT broker to deal with subscribers and publishers.

[![Author](http://img.shields.io/badge/author-@Cardosojl-blue.svg)](https://www.linkedin.com/in/jorge-luiz-cardoso-215914235/) ![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)

## Overview
The idea of this project is to be an MQTT server (broker) that handles IoT devices and applications that need to communicate with each other. It registers publishers and subscribers, sending data to subscribers registered in tags where publishers provide these informations.
This project is useful if you want to have smart devices in your home and complete control over them using a local server.


### Why Use This Project
+ Gain full control over your smart home devices with a local server.
+ Ensure secure and efficient communication using the lightweight MQTT protocol.


## Requirements
+ Docker (if you want to run the server through a container). https://www.docker.com/
+ Node.js (if you want to run the server natively). https://nodejs.org
+ ***Optional***: An external API to handle database interactions for authentication (a sample API will be provided soon).


## Getting Started
The server can be run in two ways: using a **Docker container** or **natively**. Choose your preferred method and follow the corresponding instructions below.
### Running With Docker
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Cardosojl/mqtt_broker.git ./mqtt_broker
    cd ./mqtt_broker
    ```
2. **Build the Docker image:**

     > Ensure your user has permission to execute Docker commands and verify the Docker version.
    ```bash
    docker buildx build -t mqtt_broker .
    ```
      Or, if buildx is not available:
   ```bash
   docker build -t mqtt_broker .
   ```
4. **Run the container with default settings:**
     ```bash
     docker run --init -it -p 1883:1883 --name mqtt_broker  mqtt_broker
     ``` 
    > Or you can edit the environment variables: ***CLIENT_API*** (URI of an API that handles with database for authentication), ***LOG_PATH*** (path where the log file will be located) ex:
        
     ```bash
     docker run --init -it -p 1883:1883 --name mqtt_server mqtt_server -e LOG_PATH=/usr/broker/log -e CLIENT_API=http://192.168.0.0:9999
     ```
    > TIP: To manage the server later, use:
     ```
      docker start mqtt_broker
      docker logs -f mqtt_broker
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
5. **Build the Project:**

   Before you start, you need to convert the Typescript code.
    ```bash
      npm run build
    ```
6. **Start:**
   
    After completing all the steps, you can start the broker using the command below:
    ```bash
      npm start
    ```

## Connect a Device to the Broker
To connect a device to the broker, the connection requirements depend on whether or not you are using an authentication API.
### Without an Authentication API:
   
+ If the broker is configured to allow unauthenticated connections, the device only needs to send the following information in the connection request:
    + Client ID: A unique identifier for the device (e.g., "device123").

### With an Authentication API:
   
+ When the broker is configured to use an authentication API, the device must include additional credentials in the connection request:
    + Client ID: A unique identifier for the device.
    + Username: The username registered in the system.
    + Password: The password associated with the username.

## API Integration for Device Authentication

If you want to integrate an API to handle device authentication, the MQTT broker supports this functionality through a POST request. Here's how the authentication process works:

### Broker Configuration:
   
+ To enable API-based authentication, set the ```CLIENT_API``` environment variable to the base URL of your authentication API, as mentioned in step 3 of [Running with Docker](#running-with-docker) or step 4 of [Running Natively (Without Docker)](#running-natively-without-docker).
   
### Authentication Flow:   
  + When a device attempts to connect to the broker, it needs to send 3 values: ```clientId```, ``username``, ```password```.
  + The server sends 2 values by a ``POST`` request to the endpoint ``{CLIENT_API}/login``:
    + ``username``
    + ``password``
  + If the API responds with a success status (e.g., HTTP 200 OK), the broker allows the device to connect.
  + Any other response status will deny access to the device and the server will display a log message warning.

## Logs
Logs are stored in the path specified by the ```LOG_PATH``` variable. If not customized, the default is ```/usr/log```.

## License
This project is licensed under the MIT License.
  