# React Profile Vue

A simple user profile management app implemented with a simple in memory kotlin backend and 2 frontend frameworks (React, Vue).

I started my frontend SPA work in the Angular world, but have been entirely Vue focused for the last few years. I really enjoy Vue.

I have not taken more than an introductory look at React, so this will help me to learn and compare the 2 frameworks as well (hopefully I am able to use best practices).

Aims:

 - Demonstrate React frontend implementation and testing.
 - Demonstrate Backend/Frontend integration approach with swagger/OpenAPI
 - Demonstrate Vue frontend implementation and testing
 
 ## The API
 
 Ideally, a purely functional requirements and design session would have occured long before we get to the point of thinking about what the HTTP (possibly restful) API to support that functionality would look like.
 
 But let us assume that has occurred, and now we need to think about the HTTP api. For me the perfect starting point is a spec file of some kind, and in this case I am using swagger/OpenAPI.
 
 By starting at this very lightweight and easily adjusted specificaton, people can have a good conversation around what the client (in our case a web frontend) requires and how the server can support it.
 
 This is related to the `Dependency Inversion Principal` in SOLID in my mind. The frontend works to the interface defined by the `swagger.yml`, and the server implements it. This allows for code generation on either side, which in turn can be mocked (safely if you are using a typesafe language - yay Typescript).
 
 All together, this means that the client (web UI) and the server can be developed and tested independently and in parralel.
 
 The API for this service is defined and documented in the `swagger.yml` file at the root of the project.
 
 
