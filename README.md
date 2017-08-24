# Introduction
MVVC is a light multi-page web developing framework

# Background
1. In practical developing environment, react is too heavy to create an simple web page
2. An project always contains mutiple web pages, instead of an single page which react's good at
3. React and redux are the one of most popular and welcoming web developing mode

# Concept
## **M**: Model  
Use fetch
## **VV**: View and view model  
Use [inferno](https://infernojs.org/)(a light react framwork) and redux
## **C**: Controller
Multiple pages can share or inherit props and methods by contollers

## Features
### Light react
Using `inferno` instead of react can reduce a large amount of  size of `bundle.js`
### Supports multiple projects and pages
We can choose one page or all pages in one project, or even all pages of all projects to develop
### Inferno + Redux
A robust coing mode in web development

# Getting started
First, just `git clone` the MVVC to local  
Then, install dev dependencies:   
`npm install`  
Start and view the demo on [http://localhost:3000/projectExample/pageExample](http://localhost:3000/projectExample/pageExample):  
`npm start`


# Contributing 
If you found somewhere in codes to be improved or fixed, or just make a suggestion, don't hesitate to send a pull request!