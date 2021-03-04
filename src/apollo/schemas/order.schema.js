import { gql } from 'apollo-server-express';

module.exports = gql`
    type Order {
        id: ID!
        total: Float!
        user: User
        products: [Product]
    }
    extend type Query {
        orders: [Order]
        order(id: ID!): Order
    },
    input OrderInput {
        totalAmount: Float!
        user: ID
        product: [ID]
    }
`