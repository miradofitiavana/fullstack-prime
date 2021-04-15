import { gql } from "apollo-server-express";

module.exports = gql`
  type Category {
    _id: ID!
    title: String
    products: [Product]
  }
  extend type Query {
    categories: [Category]
    category(id: ID!): Category
    findCategories(searchKey: String): [Category]
  }
`;
