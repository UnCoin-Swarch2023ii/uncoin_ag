import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    # Transactions
    listTransactions(token: String): [Transaction]
    getTransactionsByUserId(id: ID!, token: String): [Transaction]
    getTransactionById(id: ID!, token: String): Transaction
    # Users
    userByDocument(document: Int, token: String): User
    companyByDocument(document: Int, token: String): Company
    # Shipments
    allShipments(token: String): [Shipment]!
    shipmentsById(shipmentId: String, token: String): Shipment!
    shipmentsByUser(user: String, token: String): [Shipment]!
    # Kyc
    getKycImage(filename: String, token: String): Any
    compareImages(image1: Upload!, image2: Upload!): Any
  }

  type Mutation {
    # Transactions
    createTransaction(input: TransactionInput, token: String): Transaction
    createChargeOrder(input: ChargeOrderInput, token: String): Order
    # Users
    deleteUser(document: Int, token: String): User
    signInUser(input: signInInput): signUpOutput
    signUpUser(input: UserInput): signUpOutput
    updateUser(
      document: Int
      input: UserUpdateInput
      token: String
    ): String
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
      token: String
    ): Shipment

    updateShipment(
      id: String
      userId: String
      companyId: String
      shipmentValue: Float
      shipmentDate: String
      token: String
    ): Shipment
    deleteShipment(id: String, token: String): Shipment
    # Kyc
    deleteImage(filename: String, token: String): Any
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
  input signInInput {
    document: Int!
    password: String!
  }

  type signUpOutput {
    token: String
    users: User
  }

  type User {
    id: ID
    username: String
    userLastName: String
    password: String
    document: Int
    balance: Float
    enable: Boolean
  }

  input UserInput {
    userName: String
    userLastName: String
    password: String
    document: Int
    balance: Float
    enable: Boolean
  }

  input UserUpdateInput {
    userName: String
    userLastName: String
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
