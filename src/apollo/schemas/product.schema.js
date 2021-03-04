const { gql } = require('apollo-server-express');

module.exports = gql`
    type Product {
        id: ID!
        title: String!
        price: Float!
        description: String
        imgUrl: String
    }
    extend type Query {
        products: [Product]
        product(id: ID!): Product
    },
    input ProductInput {
        title: String!
        price: Float!
        description: String
        imgUrl: String
    }
    extend type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id:ID!):String
    }
`