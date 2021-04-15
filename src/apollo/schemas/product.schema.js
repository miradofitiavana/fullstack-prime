const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    _id: ID!
    title: String!
    categories: [Category]
    description: String
    price: Float!
    imgUrl: String
  }
  extend type Query {
    products(category: String): [Product]
    product(id: ID!): Product
    findProducts(searchKey: String): [Product]
  }
  input ProductInput {
    title: String!
    categories: [ID]
    description: String
    price: Float!
    imgUrl: String
  }
  extend type Mutation {
    createProduct(input: ProductInput): Product
    # updateProduct(id: ID!, input: ProductInput): Product
    # deleteProduct(id:ID!):String
  }
`;
