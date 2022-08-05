
# MySpace Blogger Website

This is a blogger website name as MySpace, which is a platform where a user can create a post.

This application is created using MERN stack, where the UI part is created using React and server is created using Node.js and Express. All the user data and Posts data are stored in MongoDB database.

Below is the link to this website, Front-End is hosted using Netlify and the server is hosted using Heroku:

```
https://my-space-mern.netlify.app/
```



## Why this project was chosen?

This web application was created to hone implementation skills. This application include complete CRUD operations i.e create, read, update, delete.
So a post created by a user can be read by other users, it can be updated and deleted by the author of the post. 

Moreover, there is a user Sign up and login functionality, so basic authentication functionality. All these are added to practice certain features which are available in almost every websites and Web Application.

## How this project is created?

This application is created using MERN stack, where UI is created using React and backend is created using Node.js and Express. The user data and post data are stored in MongoDB database.
This complete application is created on VSCode code editor.

Some of the third party libraries were also used in this application to implement some feature. Although this is a single page application but different components are rendered on different routes.

### React Router : 
React Router is a fully-featured client and server-side routing library for React, a JavaScript library for building user interfaces. React Router runs anywhere React runs; on the web, on the server with node.js, and on React Native.

The latest version of React Router i.e React Router 6 is used in this application to create all the routes.

To install React Router 6, run : 
```
npm install react-router-dom@6
```

To know more about React Router, visit this website :
```
https://reactrouter.com/docs/en/v6
```

### Redux : 
Redux is a predictable state container for JavaScript apps.
It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

Although React also allows a user to create and manage states but using Redux has more advantages.
Managing state using Redux is much more easier and managable. 

Using Redux, all our state are stored in one store. Centralizing your application's state and logic enables powerful capabilities like undo/redo, state persistence, and much more.

There are two ways to use Redux, either using core redux or redux/toolkit. In this application, redux/toolkit is used as it is syntactical more easier to understand and is more efficient than core redux.

To install Redux, run : 
```
npm install @reduxjs/toolkit
```

To use Redux in a React Application, there is another library name as 'React Redux'. It is created by the same developer team who created Redux. React Redux is maintained by the Redux team, and kept up-to-date with the latest APIs from Redux and React.

To install React Redux, run : 
```
npm install react-redux
```

To know more about Redux and React Redux, visit this website:
```
https://redux.js.org/
```

### Jodit React
Jodit is awesome and usefully wysiwyg editor with filebrowser.
This is a lightweight editor which is used to format out posts.

WYSIWYG : WYSIWYG, an acronym for What You See Is What You Get, is a system in which editing software allows content to be edited in a form that resembles its appearance when printed or displayed as a finished product, such as a printed document, web page, or slide presentation. 

To install Jodit react, run :
```
npm install jodit-react
```

To know more about Jodit react, visit this webpage : 
```
https://www.npmjs.com/package/jodit-react
```

### Express
Express.js is a back end web application framework for Node.js. Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.

To install Express, run : 
```
npm install express
```

To know more about Express, visit this website :
```
https://expressjs.com/en/starter/installing.html
```


### Mongoose 
Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.

Writing MongoDB connection code, validation, building schemas and other logic is a pain. Mongoose makes it easier to write the same logic in very less lines of code and is easy to understand and learn.

To install Mongoose, run :
```
npm install mongoose
```

To know more about Mongoose, visit this website : 
```
https://mongoosejs.com/docs/index.html
```

### JWT - JSON WEB TOKEN
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. 

In this application, JWT is used for user authorization. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

To install JWT, run :
```
npm install jsonwebtoken
```

To know more about JWT, visit these websites :
```
https://www.npmjs.com/package/jsonwebtoken

https://jwt.io/introduction
```

### Bcrypt
Bcrypt is a password-hashing function. It is used to encrypt user password in this application.

To install bcrypt, run :
```
npm install bcrypt
```

To know more about usage of Bcrypt, visit :
```
https://www.npmjs.com/package/bcrypt
```

### Express-Validator
Express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.

Express Validator makes it easier to validate the data which we get from user before we update our database.

To install Express-Validator, run : 
```
npm install express-validator
```

To know more about Express-Validator, visit : 
```
https://express-validator.github.io/docs/
```