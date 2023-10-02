import { gql } from "graphql-tag";

export const typeDefs = gql`
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

  type Query {
    userByDocument(document : Int): [User]!
    companyByUrl(document : Int): [Company]!

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
    ): String
    signUpUser(
      user_name: String
      user_lastname: String
      document: Int
      balance: Float
      password: String
      enable: Boolean
    ): String
    updateUser(document: Int): [User]

    signInCompany(
      company_name : String
      document : Int
      password : String
    ): String
    signUpCompany(
      company_name: String
      document: Int
      balance: Float
      password: String
    ): String

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
