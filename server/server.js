const jwt = require('jsonwebtoken');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
var bodyParser = require('body-parser');

const mongoose = require('./config/database'); 
mongoose.set('useCreateIndex', true);

const typeDefs = require('./modules/graphqlSchema.js');

const resolvers = require('./modules/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// JWT Middelware 
// app.use(async (req, res, next) => {
//     console.log(req.cookies);
//     const token = req.cookies.token ? req.cookies.token : null;
//     if (token !== null) {
//         try {
//             const currentUser = await jwt.verify(token, config.get('jwtPrivateKey'));
//             req.currentUser = currentUser;
//         } catch (err) {
//             //   console.error(err);
//             res.clearCookie('token');
//         }
//     }
//     next();
// });

server.applyMiddleware({ app });

server.graphqlPath = "/hello";
// app.listen({ port: 3000 }, () => {
//     console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
// });
app.listen(4000);