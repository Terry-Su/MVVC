# Introduction
MVVC is a light **multi-page** and **popular front frameworks supported** web developing framework


# Concept
1. **M**: Model  
2. **VV**: View and view model    
3. **C**: Controller  


# Background
1. In real developing environment, coworkers may use different front frameworks, like react, angular, vue, mirror, etc. 
2. A web project always contains mutiple web pages, instead of a single application page
3. It's better not to repeat same development and production's configuration


# Feature
## Specific
1. Choose specific react, inferno, and other projects to generate
2. Choose specific pages in specific projects to develop or build

## MVVC 
Decouple models, view and view models and controllers

## Reusability
Multiple pages can share or inherit props and methods by contollers




# Getting started
There're two simple ways to start(Step by step)
## Local
```
# Step1 Create root
mkdir MvvcProject & cd MvvcProject

# Step2 Install
npm install mvvc

# Step3 Initilize
node_modules/.bin/mvvc init
```

## Global
```
# Step1 Install globally
npm install mvvc -g

# Step2 Initilize root project
mvvc init -p MvvcProject
```
> Tip: choose project(s) to generate when mvvc was initialized partly

You've gotten a complete project which can be moved to anywhere to develop, then let's start to develop
```
# Step1 (Ingore this step if MvvcProject was created locally) Switch to MvvcProject
cd MvvcProject

# Step2 Install dependencies
npm install 

# Step3 Start
npm start
```

# Contributing 
If you found somewhere in codes to be improved or fixed, or just make a suggestion, don't hesitate to send a pull request!