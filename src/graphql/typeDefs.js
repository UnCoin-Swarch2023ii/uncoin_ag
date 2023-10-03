import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    # Transactions
    listTransactions: [Transaction]
    getTransactionsByUserId(id: ID!): [Transaction]
    getTransactionById(id: ID!): Transaction
    # Users
    userByDocument(document: Int): User!
    companyByDocument(document: Int): Company!
    # Shipments
    allShipments: [Shipment]!
    shipmentsById(shipmentId: String): Shipment!
    shipmentsByUser(user: String): [Shipment]!
    # Kyc
    getKycImage(filename: String): Any
    compareImages(image1: Upload!, image2: Upload!): Any
  }

  type Mutation {
    # Transactions
    createTransaction(input: TransactionInput): Transaction
    createChargeOrder(input: ChargeOrderInput): Order
    # Users
    deleteUser(document: Int): User
    signInUser(user_name: String, document: Int, password: String): User
    signUpUser(
      user_name: String
      user_lastname: String
      document: Int
      balance: Float
      password: String
      enable: Boolean
    ): User
    updateUser(document: Int): User
    signInCompany(
      company_name: String
      document: Int
      password: String
    ): Company
    signUpCompany(
      company_name: String
      document: Int
      balance: Float
      password: String
    ): Company

    # Shipments
    addShipment(
      userId: String
      companyId: String
      shipmentValue: Float
      shipmentDate: String
    ): Shipment

    updateShipment(
      id: String
      userId: String
      companyId: String
      shipmentValue: Float
      shipmentDate: String
    ): Shipment
    deleteShipment(id: String): Shipment
    # Kyc
    deleteImage(filename: String): Any
  }

  scalar Any
  scalar Upload

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
  type User {
    _id: ID
    userName: String
    userLastname: String
    password: String
    document: Int
    balance: Float
  }

  type Company {
    _id: ID
    companyName: String
    password: String
    NIT: Int
    balance: Float
  }

  type Shipment {
    _id: ID
    userId: String
    companyId: String
    shipmentValue: Int
    shipmentDate: String
  }
`;
