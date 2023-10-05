import axios from "axios";

const urlKycMs = "http://kyc_ms:3000/kyc-api";
const urlTransactionsMs = "http://transactions_ms:3002/transactions-api";
const shipmentUrl = "http://billing_ms:4000/billing-api/";

// TODO: Review the next urls and their queries and mutations
const userUrl = "http://localhost:4001/auth-api/user";
const companyUrl = "http://localhost:4001/auth-api/company";

export const resolvers = {
  Query: {
    // Transactions
    listTransactions: async (_, { token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.get(urlTransactionsMs + "/");
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    getTransactionsByUserId: async (_, { id, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.get(urlTransactionsMs + "/list/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    getTransactionById: async (_, { id, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.get(urlTransactionsMs + "/detail/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    // Users
    userByDocument: async (root, args) => {
      const { document } = args;
      const user = await axios
        .get(userUrl + "/get/" + document)
        .then((res) => res.data.data);
      return user;
    },
    companyByDocument: async (root, args) => {
      const { document } = args;
      const shipments = await axios
        .get(companyUrl + "/get/" + document)
        .then((res) => res.data.data);
      return shipments;
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
      try {
        const { shipmentId, token } = args;

        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const shipment = await axios
          .get(shipmentUrl + "get-shipment/" + shipmentId)
          .then((res) => res.data.data);
        return shipment;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    shipmentsByUser: async (root, args) => {
      try {
        const { token, ...user } = args;

        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const shipments = await axios
          .get(shipmentUrl + "userShipments/" + user)
          .then((res) => res.data.data);
        return shipments;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    // Kyc
    getKycImage: async (_, { filename, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.get(urlKycMs + "/get-image/" + filename);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    compareImages: async (_, { image1, image2 }) => {
      try {
        const response = await axios.post(urlKycMs + "/compare_images", {
          image1,
          image2,
        });
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // Transactions
    createTransaction: async (_, { input, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.post(urlTransactionsMs + "/p2p", input);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    createChargeOrder: async (_, { input, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.post(
          urlTransactionsMs + "/create-order/",
          input
        );
        return response.data.order;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    // Users
    deleteUser: async (root, args) => {
      const { document } = { args };
      const response = await axios
        .delete(userUrl + "/delete" + document)
        .then((res) => res.data.data);
      return response;
    },
    signUpUser: async (_, { input }) => {
      try {
        const response = await axios.post(userUrl + "/signup", input);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (root, args) => {
      const { document } = { args };
      const response = await axios
        .put(userUrl + "/update" + document)
        .then((res) => res.data.data);
      return response;
    },
    signInCompany: async (root, args) => {
      const { company } = { ...args };
      const response = await axios
        .post(companyUrl + "/signin", company)
        .then((res) => res.data.data);
      return response;
    },
    signUpCompany: async (root, args) => {
      const { company } = { ...args };
      const response = await axios
        .post(companyUrl + "/signup", company)
        .then((res) => res.data.data);
      return response;
    },

    // Shipments
    addShipment: async (root, args) => {
      const { token, ...shipmentData } = args; // Destructure token from args
      const shipment = { ...shipmentData };
      const response = await axios
        .post(shipmentUrl, shipment, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        })
        .then((res) => res.data.data);
      return response;
    },
    updateShipment: async (root, args) => {
      const { token, id, ...shipmentData } = args; // Destructure token and id from args
      const shipment = { ...shipmentData };
      const response = await axios
        .patch(shipmentUrl + "/update/" + id, shipment, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        })
        .then((res) => res.data.data);
      return response;
    },
    deleteShipment: async (root, args) => {
      const { token, id } = args; // Destructure token and id from args
      const response = await axios
        .delete(shipmentUrl + "/" + id, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        })
        .then((res) => res.data.data);
      return response;
    },
    // KYC
    deleteImage: async (_, { filename, token }) => {
      try {
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const response = await axios.delete(
          urlKycMs + "/delete-image/" + filename
        );
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
  },
};
