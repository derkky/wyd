# wyd
#### Video Demo: https://youtu.be/E2l4Y_2z_M8
#### Description:
"An app to easily share what you're doing with the rest of the world." 

wyd is an app to easily share what you're doing with the rest of the world. Simply type out what you want to and click on the "post" or "comment" buttons to easily share your thoughts, feelings, or actions. Inspired by MLIA (my life is average). 

React and Material UI were used for the frontend. 

Node, Express and Mongoose were used for the backend. MongoDB was used for the database. 

The app is deployed to an AWS EC2 instance, with an nginx reverse proxy used to redirect requests to the app. Certbot was used to register for an SSL certificate so as to allow the app to use the HTTPs protocol. This is important for security reasons, and also because many browsers will flag out or prevent users from accessing websites through the HTTP protocol. 

Finally, I assigned the public IP address to a subdomain of my personal  website (donfoh.com). The domain name was purchased from Google domains. 

Within the project directory, you will find the api and frontend-build folders.

The api folder contains the backend code. Within this folder, there are 3 folders: controllers, models, routes. The models folder contains the data models for comments and posts. The controllers folder contains the code for the CRUD operations on these models. Finally, the routes folder contains the code which defines the URLs for each of the API endpoints.  

The API endpoints for posts and comments are paginated for greater efficiency. The app utilises this to create an "infinite scroll" in the frontend, wherein users are immediately presented with the next "page" of results once they've scrolled to the bottom of the page. 

Next, the frontend-build folder contains the code for the frontend. Within it, there are the src and build folders. The src folder contains the source code for the frontend. It comprises the code for multiple components, namely PostCard (the card component for each post), PostCardContainer (the container which holds all post cards) and TitleCard (the card component which holds the name of the app). The build fodler contains the miniaturized code for the frontend. The contents of this folder are what is actually served by the server to users. 

The frontend was created with responsiveness in mind, and so it can be used on both desktop and mobile devices. 

The app's favicon was generated online with https://favicon.io/. The font used was "Gluten", by The Gluten Project Authors (Copyright 2020). 

To setup the app locally:

1. git clone the repository
2. Install dependencies in the main directory
3. cd to frontend-build and install dependencies there as well
4. npm run build in the frontend-build directory
5. create a .env using .env.example, filling in your MongoDB URI and the port you would like to serve the app on
6. cd to the main directory and run node app.js

I hope you enjoy my project :)
