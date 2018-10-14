# Puente Angular 

## Stack
![](https://img.shields.io/badge/angular_2+-✓-blue.svg)
![](https://img.shields.io/badge/parse_server-✓-blue.svg)

## About 
This web application is meant to be the web platform used to manage data collected on the ionic mobile application [Puente Data Collection](https://puente-dr.com/data-collection/)

## Angular Framework

Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations. Those powerful capabilities are brought to Angular because it provides mobile-friendly `HTML`, `JS`, and `CSS` components to developers.

## Parse Server

**Parse Server** is an open source version of the Parse backend that can be deployed to any infrastructure that can run `Node.js`. Its repository on [Github](https://github.com/parse-community/parse-server).


# Build and Run 
## Install
```
git clone <THIS_PROJ>
cd THIS_PROJ
npm install
```


# Run
```
npm run start
```
## Build
For debug build
```
npm run build
```
The build artifacts will be stored in the `dist/` directory. 

For production build
```
npm run build:production
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

**Look at the structure of the project in order to generate component in the correct location**
```
ng generate directive|service|etc /providers/componentName/componentName
```
This will create a folder for the component in the providers directory with the .TS files inside that folder

# Known Issues
- Need to set environmental variables for local development/production 
- Need to set mongo migration for demo data


# Contribution

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <EMAIL-ADDRESS>

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
