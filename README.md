# CAME-As-A-Service (CMaaS)

CAME as a Service (CMaaS) is a CAME (Computer-Aided Method Engineering) tool built as a service that can serve users from multiple tenant to support [Situational Method Engineering (SME)](https://www.researchgate.net/publication/264810491_Situational_Method_Engineering) process. It is built as a part of [Service-Oriented Situational Method Engineering (SOSME)](https://ieeexplore.ieee.org/document/8988863) Architecture. 

Based on the SOSME Architecture, there are 3 components that is needed to run SME process like existing CAME tools do. 

## SOSME Components:
### 1. CAME (CMaaS)
This is the client-side of SOSME Architecture. This part is the place for client (user) to build situational method. It is built as a service that can serve users from multiple tenant, hence named CAME as a Service (CMaaS)

This project is focused on building this part. It is built as a web app with Node.js, MongoDB, and React + Redux. The method composition process that takes place in here is adopted from [Christopher Clement Andreas' works](https://ieeexplore.ieee.org/document/9092736).

### 2. MBMS
This is the provider of this architecture. It provides method chunks that is needed to build situational method. 

This part of project is originally developed by [Gianfranco Fertino](https://github.com/gejimayu/mbms). In this project, this part has been modified a little to support SME process in CAME component.

In this repository, there are two MBMS that simulates two separate and different method chunks providers

### 3. MCRS
This is the registry of this architecture that connects CAME and MBMS to support method chunks retrievals that is needed to build situational method. 

This part of project is originally developed by [Audry Nyonata](https://github.com/audrynyonata/MCRS). In this project, this part has been modified a little to support SME process in CAME component. 

## How to run this project

To run this project, the 3 components must be run. Here are the steps after you clone this project

### Run CAME
There are two subprojects here,
1. frontend - React + Redux web application that provides a GUI for CAME
2. web-service - Node.js + MongoDB + RESTful API implementation of CAME

Requirements: Node.js, MongoDB, React

after requirements are fulfilled you can proceed to run.

#### Run frontend
1. Go to folder `CAME\frontend`
2. Install dependencies with `npm install`
3. Create `.env` file (by copy it from the `.env.example` file)
4. Start web application with `npm start`

Open localhost:3200 to view it in the browser

#### Run web-service
1. Go to folder `CAME\web-service`
2. Install dependencies with `npm install`
3. Create `.env` file (by copy it from the `.env.example` file) and fill the MongoDB database's details based on your environment settings
4. Start the server with `npm start`

The server will run on port 4500 if you don't change the port in the env file.

### Run MBMS
There are two MBMS that simulates two separate and different method chunks providers, named MBMS1 and MBMS2. 

Requirements: Node.js + MongoDB

To run both MBMS, apply these steps to both of them

1. Go to folder `MBMS\mbms1\web-service` for MBMS1 and `MBMS\mbms2\web-service` for MBMS2
2. Install dependencies with `npm install`
3. Create `.env` file (by copy it from the `.env.example` file) and fill the MongoDB database's details based on your environment settings. The DB name and port must be different between MBMS1 and MBMS2
4. Start the server with `npm start`

If you don't change the port, the server will run on port 8080 for MBMS1 and port 8081 for MBMS2

To add method chunks to the respective MBMS, here are the steps (do it in Postman app):
1. Register as a user via endpoint `\register` using `POST` method with body `username` and `password` in JSON.
2. After registered, the user will receive a bearer token for authorization
3. Add method chunk via endpoint `\method-chunk` using `POST` method with body completely copied from folder `MBMS\mbms1\method chunks` or `MBMS\mbms2\method chunks` in JSON format and provide bearer token for authorization

Originally, MBMS has the frontend part so that user can operate it via web browser. But, for this project, the method chunk representation is different from the original and the frontend part has not been adjusted to display method chunk in the new representation so the only way to see the provided method chunks is to see it via database or endpoint `\method-chunk` using `GET` method. To see the original, go to this [repository](https://github.com/gejimayu/mbms)

### Run MCRS
There are 3 subprojects here,

Subprojects:
1. mcrs - Node.js + MongoDB + OpenAPI 3.0 RESTful API implementation of MCRS
2. mcdm - Flask (Python) app for calculating multi-criteria algorithms used in method chunk find recommendations
3. client - ReactJS + Redux web application that provides a GUI for MCRS 

To run this project, the client part is not necessarily needed to be run. It is only needed to enable user to navigate MCRS app.

Requirements: Node.js, MongoDB, React, Python 3.7 + Flask

#### Run mcrs 

1. Go to subfolder `\MCRS\mcrs`. 
2. Install dependencies `npm install`. 
3. Start API server `npm start`. 

The server (mcrs) will run on port 4000

#### Run mcdm

1. Go to subfolder `\MCRS\mcdm`. 
2. Install virtualenv first via command `pip install virtualenv` (or browse in internet how to install virtual environment in python) if you have not installed it yet.
3. Create virtual environment with command `virtualenv env`. After the process is done, it will create folder `env`
4. Start the virtual environment with command `env\Scripts\activate`.
5. Install dependencies `pip install -r requirements.txt`
6. After dependencies is installed, start the application with command `start.bat`

The server will run on port 5000

#### Run client 
1. Go to subfolder `\MCRS\client`.
2. Install dependencies with `npm install`
3. Start the web application with `npm start`

The web app will run on `localhost:3800`


## About method chunks
To create situational method in this tool, we create it by composing method chunks. To compose it, the method chunks should be provided first in the MBMS and must be published in the MCRS so it will be discoverable by CAME.

### Add method chunks in the MBMS

To provide method chunks, MBMS must add them first. The steps to add method chunks in MBMS have been explained in the explanation of how to run MBMS

### Publish method chunks in the MCRS
To publish method chunks in the MCRS, we can do it via the web app.
Steps:
1. Add MBMS1 and MBMS2 as provider in the MCRS
2. Find Add new method chunk menu to add and publish method chunks that has been provided in the MBMS

### Method chunks availability
Method chunks that is in the right format (in a representation that can be processed by CAME) is only 5 method chunks, which is in the folder `\method-chunks\processable`
1. Agile Development
2. Agile Retrospective
3. Daily Standup
4. Product Backlog
5. Product Ownership


By Rinda Nur Hafizha
github.com/rindanh/CAME-As-A-Service
