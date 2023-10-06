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
    deleteUser(document: Int, token: String): String
    signInUser(user_name: String, document: Int, password: String): User
    signUpUser(
      user_name: String
      user_lastname: String
      document: Int
      balance: Float
      password: String
      enable: Boolean
    ): User
    updateUser(
      user_name: String
      user_lastname: String
      document: Int
      balance: Float
      token: String): String
    signInCompany(
      company_name: String
      nit: Int
      password: String
    ): Company
    signUpCompany(
      companyName: String
      nit: Int
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
  type User {
    _id: ID
    userName: String
    userLastname: String
    password: String
    document: Int
    balance: Float
  }

  type Company {
    id: String
    companyName: String
    password: String
    nit: Int
    balance: Float
  }

  type Shipment {
    _id: ID
    userId: String
    companyId: String
    shipmentValue: Int
    shipmentDate: String
  }

  type Query {
    userByDocument(document : Int): User!
    companyByDocument(document : Int): Company!

    allShipments: [Shipment]!
    shipmentsById(shipmentId : String): Shipment!
    shipmentsByUser(user : String): [Shipment]!
  }

  type Mutation {
    deleteUser(document : Int): User
    signInUser(
      user_name: String
      document: Int
      password: String
    ): User
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
      company_name : String
      document : Int
      password : String
    ): Company
    signUpCompany(
      company_name: String
      document: Int
      balance: Float
      password: String
    ): Company

    addShipment(
      userId: String
      companyId: String
      shipmentValue: Float
      shipmentDate: String
    ): Shipment
  
    updateShipment(id: String
      userId: String
      companyId: String
      shipmentValue: Float
      shipmentDate: String
    ): Shipment

    deleteShipment(id: String): Shipment

  }

`;
