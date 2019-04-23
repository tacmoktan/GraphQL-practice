# Steps

## Node Initialization
1. Create a new folder for project. 
2. Create a **server** folder within project folder.
3. On command line, locate **server** folder and initialize npm.
```
npm init
```
Above command ask lot of questions, so to answer all questions with default answers
```
npm init --yes
```

## Creating Server
### 1. Express Setup
* Using core HTTP modules to perform complex( heavy ) client-server interaction is a tedious task.
* So, Express.js is a framework that helps us with complex client-server interaction in web applications.  
Steps to setup
   1. On command line, locate **server** folder and install express. 
```
npm install express
```

### 2. nodemon and graphiql Installation

1. Install `nodemon`.  
    * tool that automatically restarts the node application when file changes in the directory are detected.
    * Don't need to restart/re-create the server through command line everytime a change is made. Just refresh browser to see changes through **graphiql**.  
```
npm install -g nodemon
```  

2. Install graphiql
    * A in-browser IDE for viewing schema and interacting using graphQL queries.  
```
npm install --save graphiql
```

3. Creating or listening server with `nodemon`.  
```
nodemon app.js
```

4. Checkout `localhost:<portNumber>/<graphQLendpoint>` on browser.  
(e.g. `localhost:4000/graphql`)  
Source code: [server/app.js](server/app.js) .

### 3.  GraphQL Setup

* GraphQL is a data query and manipulation language.
```
npm install graphql express-graphql
```
*  `graphql` installs main GraphQL packages.
*  `express-graphql` installs packages through which **GraphQL API** can be used in **Express server** ( GraphQL and Express can understand eachother ) .

### 4. lodash library

* provide functions for common programming tasks.
```
npm install lodash
```
* e.g `_.find( books , {id: args.id});` to find a specific book with matching id.  
books => Array of objects  
Source code: [server/schema/schema.js](server/schema/schema.js)

### 5. Atlas: MongoDB
* Login to [cloud mongodb](cloud.mongodb.com) Then  
    1. Build a cluster
    2. Add database user
    3. add ip address to ip whitelist
    4. connect
* More Detail: [Atlas: MongoDB](https://codeforgeek.com/2018/03/mongodb-atlas-node-js/) 
