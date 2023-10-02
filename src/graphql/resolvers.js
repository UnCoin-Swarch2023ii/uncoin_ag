import axios from "axios";

const shipmentUrl = "http://localhost:3003/billing-api/";
const userUrl = "http://localhost:3001/auth-api/user/"
const companyUrl = "http://localhost:3001/auth-api/company/"


export const resolvers = {
  Query: {
    // Users
    userByDocument: async (root, args) => {
      const { document } = args;
      const user = await axios.get(userUrl + "/get/" + document).then((res) => res.data.data);
      return user;
    },

    companyByUrl: async (root, args) => {
      const { document } = args;
      const shipments = await axios.get(companyUrl + "/get/" + document).then((res) => res.data.data);
      return shipments;
    },

    // Shipments
    allShipments: async () => {
      const shipments = await axios.get(shipmentUrl).then((res) => res.data.data);
      return shipments;
    },

    shipmentsById: async (root, args) => {
      const { shipmentId } = args;
      const shipment = await axios.get(shipmentUrl+'get-shipment/' + shipmentId).then((res) => res.data.data);
      return shipment;
    },
    
    shipmentsByUser: async (root, args) => {
      const { user } = args;
      const shipments = await axios.get(shipmentUrl+ 'userShipments/' + user).then((res) => res.data.data);
      return shipments;
    },
  },

  Mutation: {
    // Users
    deleteUser: async (root, args) => {
      const { document } = { args };
      const response = await axios.delete(userUrl + "/delete" + document).then((res) => res.data.data);
      return response;
    },
    signUpUser: async (root, args) => {
      const { user } = { ...args };
      const response = await axios.post(userUrl + "/signin", user).then((res) => res.data.data);
      return response;
    },
    signUpUser: async (root, args) => {
      const { user } = { ...args };
      const response = await axios.post(userUrl + "/signup", user).then((res) => res.data.data);
      return response;
    },
    updateUser: async (root, args) => {
      const { document } = { args };
      const response = await axios.put(userUrl + "/update" + document).then((res) => res.data.data);
      return response;
    },
    signInCompany: async (root, args) => {
      const { company } = { ...args };
      const response = await axios.post(companyUrl + "/signin", company).then((res) => res.data.data);
      return response;
    },
    signUpCompany: async (root, args) => {
      const { company } = { ...args };
      const response = await axios.post(companyUrl + "/signup", company).then((res) => res.data.data);
      return response;
    },

    // Shipments
    addShipment: async (root, args) => { 
      const shipment = { ...args };
      const response = await axios.post(shipmentUrl, shipment).then((res) => res.data.data);
      return response;
    },
    updateShipment: async (root, args) => {
      const id  =  args.id ;
      const shipment = { ...args };
      const response = await axios.patch(shipmentUrl + "/update/" + id, shipment).then((res) => res.data.data);
      return response;
    },
    deleteShipment: async (root, args) => {
      const id  =  args.id ;
      const response = await axios.delete(shipmentUrl + "/" + id).then((res) => res.data.data);
      return response;
    }
  }


};
