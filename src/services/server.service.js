const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./../configs');
const port = config.server.port;

const apiRouter = require('./../routes');

const schema = require('./../apollo/schemas');
const resolvers = require('./../apollo/resolvers');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const graphQLServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: (err) => {
        console.log(err);
        return ({ message: err.message, status: err.status })
    },
});

graphQLServer.applyMiddleware({ app, path: '/graphql' });

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', apiRouter);

exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit(-1);
        }
        console.log(`App is running on  port ${port}`);
    });
}