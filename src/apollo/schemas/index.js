const { gql } = require("apollo-server-express");

const categorySchema = require("./category.schema.js");
const productSchema = require("./product.schema.js");
const orderSchema = require("./order.schema.js");
const userSchema = require("./user.schema.js");

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [
    linkSchema,
    categorySchema,
    productSchema,
    orderSchema,
    userSchema,
];
