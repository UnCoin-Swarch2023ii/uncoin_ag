import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    # Transactions
    listTransactions: [Transaction]
    getTransactionsByUserId(id: ID!): [Transaction]
    getTransactionById(id: ID!): Transaction
  }

  type Mutation {
    # Transactions
    createTransaction(input: TransactionInput): Transaction
    createChargeOrder(input: ChargeOrderInput): Order
  }

  # ----------- Transactions -----------
  type Order {
    id: ID
    status: String
    links: [OrderLinks]
  }

  type OrderLinks {
    href: String
    rel: String
    method: String
  }

  input TransactionInput {
    senderId: ID!
    receiverId: ID!
    amount: Float!
  }

  input ChargeOrderInput {
    userId: ID!
    amount: Float!
  }

  type Transaction {
    id: ID!
    amount: Float!
    description: String!
    receiverId: String
    senderId: String
    type: String!
    status: String!
  }

  # ----------- KYC -----------
`;
