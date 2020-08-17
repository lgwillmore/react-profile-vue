# React Profile Vue

A simple user profile management app implemented with a simple in memory kotlin backend and 2 frontend frameworks (React, Vue).

I started my frontend SPA work in the Angular world, but have been entirely Vue focused for the last few years. I really enjoy Vue.

I have not taken more than an introductory look at React, so this will help me to learn and compare the 2 frameworks as well (hopefully I am able to use best practices).

Aims:

 - [x] React project structure.
 - [x] React routing basics.
 - [x] React and redux basics.
 - [x] React tested with cypress.
 - [ ] React forms and validation tools.
 - [x] Backend/Frontend integration approach with swagger/OpenAPI
 - [ ] Vue project structure.
 - [ ] Vue routing basics.
 - [ ] Vue and vuex basics.
 - [ ] Vue tested with cypress.
 - [ ] Vue forms and validation tools.
 - [ ] Full implementation of login/logout/authentication
 - [ ] Better styling and UX
 
 ## Setup
 
 You will need:
 
  - For front ends you will need Nodejs and NPM installed (this was developed with node `v10.18.1`)
  - For the backend you will need some version of JDK 8 configured
  
## Overview

This is a multi-module gradle project:

 - **frontend-react:** This is a react frontend which expects to interface with the API defined by `swagger.yml`
 - **backend:** This is a kotlin/ktor backend which implements the API defined by `swagger.yml`
 
 ## The API
 
 Ideally, a purely functional requirements and design session would have occured long before we get to the point of thinking about what the HTTP (possibly restful) API to support that functionality would look like.
 
 But let us assume that has occurred, and now we need to think about the HTTP api. For me the perfect starting point is a spec file of some kind, and in this case I am using swagger/OpenAPI.
 
 By starting at this very lightweight and easily adjusted specificaton, people can have a good conversation around what the client (in our case a web frontend) requires and how the server can support it.
 
 This is related to the `Dependency Inversion Principal` in SOLID in my mind. The frontend works to the interface defined by the `swagger.yml`, and the server implements it. This allows for code generation on either side, which in turn can be mocked (safely if you are using a typesafe language - yay Typescript).
 
 All together, this means that the client (web UI) and the server can be developed and tested independently and in parralel.
 
 The API for this service is defined and documented in the `swagger.yml` file at the root of the project.
 
 ## frontend-react
 
 ### Initialise
 
 1) Install the node modules:
         
        ./gradlew frontend-react:npmInstall
         
 2) Generate the typescript client from the `swagger.yml`. This will generate the client for the api at `frontend-react/src/client/generated`
 
        ./gradlew frontend-react:openApiGenerate
        
### Test

Once you have installed and generated the client, you can start running tests. 

We are using `Cypress` for full UI based tests. Cypress is a javascript browser testing tool with some good improvements over tools like selenium. You can find the tests at `frontend-react/cypress/integration`

1) Start the development server. From the `frontend-react` directory. This will start the dev server at `http://localhost:3000`. *(Note, this will not work for real interaction without the backend. See below for starting the backend)*

       npm run start
       
2) You then have a choice on how to run the tests:
          
    - **Recommended:** Start the cypress test runner and watch the tests execute, with the ability to step through each test run.
    
          npm run cypress:open   
          
    - Or a single run from the command line. This will output mp4 recordings of the test runs at `cypress/videos`
    
          npm run cypress:run
          
          
# backend

If you want to run the frontend application for real against a lightweight backend.

1) We also generate server side code from the `swagger.yml`. This means that our frontend and backend are in sync with expectations.

       ./gradlew backend:openApiGenerate

2) Start the backend. From the project root directory you can start the backend at `http://localhost:5000` with:

       ./gradlew backend:run
       
3) Now you can start the frontend  dev server and interact with it at `http://localhost:3000`. From the `frontend-react` directory:

       npm run start

       



         
         
 
 
