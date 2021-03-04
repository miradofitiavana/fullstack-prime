import { gql } from 'apollo-server-express';

module.exports = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String
        password: String
        isAdmin: Boolean
        age: Int
    }
    extend type Query {
        myOrders(user:ID!): [Order]
    },
`