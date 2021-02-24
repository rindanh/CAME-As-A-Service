# MCRS

This project is a JavaScript implementation of MCRS as part of SOSME.

Subprojects:
1. mcrs - Node.js + MongoDB + OpenAPI 3.0 RESTful API implementation of MCRS
2. mcdm - Flask (Python) app for calculating multi-criteria algorithms used in method chunk find recommendations
3. client - ReactJS + Redux web application that provides a GUI for MCRS  

How to run:

1. `git clone https://github.com/audrynyonata/mcrs`
2. Go to subfolder `mcrs`. Install dependencies `npm install`. Start API server `nodemon server.js`. Populate with sample data by `node seeder.js`.
3. Go to `mcdm`.  Start virtual environment `env\Scripts\activate`. Install dependencies `pip install -r requirements.txt`. Use virtual environment and start application `start.bat`
(command utk bikin virtual envnya: virtualenv env)
4. Go to `client`. Install dependencies `yarn install`. Start web application `yarn start`
5. Enjoy
 
 Run tests:
 1. `nodemon server.js`
 2. `start.bat`
 3. `cd mcrs && node test.js`

**MCRS (Method Chunk Registry System)** is a part of SOSME (Service-oriented Situational Method Engineering). In SOSME architecture, MBMS (Method Base Management System), MCRS, and CAME (Computer-aided Method Engineering) tool interact in a service-oriented manner. MBMS acts as provider (publish method chunk to registry) whereas CAME tool acts as a client (find/retrieve method chunk from registry).

Method chunk is a representation of method fragment.  In SME, a method is made up of smaller pieces (e.g. fragments, chunks). Method fragment can be regarded as an atomic element of a method. In contrast, a method chunk is a combination of one process-focussed fragment plus one product-focussed fragment. Fragments or chunks should be stored in a method base [1][2].

[1] [Brinkkemper, S ‘Method Engineering: Engineering of Information Systems Development Methods and Tools’, in Information and Software Technology Vol 38 No 4 (1996) pp 275-280](https://www.researchgate.net/publication/220609794_Method_engineering_Engineering_of_information_systems_development_methods_and_tools)

[2] [Henderson-Sellers, B, and Ralyte, J  ‘Situational method engineering: State-of-the-Art Review, in Journal of Universal Computer Science Vol 16 No 3 (2010) pp 424-478](https://www.researchgate.net/publication/220349352_Situational_Method_Engineering_State-of-the-Art_Review)