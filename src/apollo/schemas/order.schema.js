import { gql } from "apollo-server-express";

module.exports = gql`
  type Order {
    _id: ID!
    total: Float!
    user: User
    products: [Product]
    reference: String
    createdAt: String
    updatedAt: String
    sentAt: String
    deliveredAt: String
  }
  extend type Query {
    orders: [Order]
    order(id: ID!): Order
  }
  input OrderInput {
    totalAmount: Float!
    user: ID
    product: [ID]
  }
`;
