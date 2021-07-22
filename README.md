# Memories_SocialMedia_ReactApp

## Technology Used
FrontEnd -> React JS , Material UI

BackEnd -> NodeJs

## Features
You can Create, Delete, Edit, Like Posts

Complete Authorization has been done including google login

![Home Page](https://user-images.githubusercontent.com/79898304/126598435-5718abaa-694e-4d8d-a638-f8377a265a9f.png)
![Login-Register](https://user-images.githubusercontent.com/79898304/126598640-686ba759-5836-4276-983a-1287cd27236d.jpg)
![withoutLogin](https://user-images.githubusercontent.com/79898304/126598562-548c5caa-87c7-4631-8c78-ba306699bc90.png)

## Steps Followed while making this Project

1) build react_app using npx create-react-app memories

2) Create FrontEnd Design 
    i have used material ui design and also created some basic components
    a) create material ui login/register page
    b) create Card/posts component
    c) Create your own Responsive Navbar 
3) now came to backend and start building api end points
    a) for login/ Register
    b) for Posts like createPost getPosts editPost deletePost etc
4) now done the authorization part which include both frontend and backend
    a) generating token
    b) verifying token
    c) adding auth middleware for protecting private routes

