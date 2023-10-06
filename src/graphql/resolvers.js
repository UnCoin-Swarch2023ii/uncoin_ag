import axios from "axios";

const urlKycMs = "http://kyc_ms:3000/kyc-api";
const urlTransactionsMs = "http://transactions_ms:3002/transactions-api";
const shipmentUrl = "http://billing_ms:4000/billing-api/";

// TODO: Review the next urls and their queries and mutations
const userUrl = "http://users_ms:4001/auth-api/user";
const companyUrl = "http://users_ms:4001/auth-api/company";

export const resolvers = {
  Query: {
    // Users
    userByDocument: async (root, args) => {
      try {
        const { document } = args;
        const user = await axios
          .get(userUrl + "/get/" + document)
          .then((res) => res.data);
        return user;
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);
      }
    },

    companyByDocument: async (root, args) => {
      try {
        const { document } = args;
        const company = await axios
          .get(companyUrl + "/get/" + document)
          .then((res) => res.data);
        return company;
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);
      }
      
    },

    // Shipments
    allShipments: async (_, { token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");
        const shipments = await axios
          .get(shipmentUrl)
          .then((res) => res.data.data);
        return shipments;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
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
      try {
        const { document } =  args ;
        const response = await axios
          .delete(userUrl + "/delete/" + document)
          .then((res) => res.data.message);
        return response;
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }
      
    },
    signInUser: async (root, args) => {
      try {
        const { ...user } = args ;
        const response = await axios
          .post(userUrl + "/signin", user)
          .then((res) => res.data.users);
        return response;        
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }

    },
    signUpUser: async (root, args) => {
      try {
        const { ...user } =  args ;
        const response = await axios
          .post(userUrl + "/signup", user)
          .then((res) => res.data.users);
        return response;        
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }
    },
    updateUser: async (root, args) => {
      try {
        const { document, ...user} = args ;
        const response = await axios
          .put(userUrl + "/update/" + document, user)
          .then((res) => res.data.message);
        return response;        
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }

    },
    signInCompany: async (root, args) => {
      try {
        const { ...company } = args ;
        const response = await axios
          .post(companyUrl + "/signin", company)
          .then((res) => res.data.users);
        return response;        
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }

    },
    signUpCompany: async (root, args) => {
      try {
        const { ...company } =  args ;
        const response = await axios
          .post(companyUrl + "/signup", company)
          .then((res) => res.data.users);
        return response;        
      } catch (error) {
        console.error("An error occurred:" + error.response.data.message);
        throw new Error(error);        
      }

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
