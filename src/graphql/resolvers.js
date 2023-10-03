import axios from "axios";

const urlKycMs = "http://kyc_ms:3000/kyc-api";
const urlTransactionsMs = "http://transactions_ms:3002/transactions-api";
const shipmentUrl = "http://billing_ms:4000/billing-api/";

// TODO: Review the next urls and their queries and mutations
const userUrl = "http://localhost:3001/auth-api/user/";
const companyUrl = "http://localhost:3001/auth-api/company/";

export const resolvers = {
  Query: {
    // Transactions
    listTransactions: async () => {
      try {
        const response = await axios.get(urlTransactionsMs + "/");
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
      }
    },
    getTransactionsByUserId: async (_, { id }) => {
      try {
        const response = await axios.get(urlTransactionsMs + "/list/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
      }
    },
    getTransactionById: async (_, { id }) => {
      try {
        const response = await axios.get(urlTransactionsMs + "/detail/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
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
    allShipments: async () => {
      const shipments = await axios
        .get(shipmentUrl)
        .then((res) => res.data.data);
      return shipments;
    },
    shipmentsById: async (root, args) => {
      const { shipmentId } = args;
      const shipment = await axios
        .get(shipmentUrl + "get-shipment/" + shipmentId)
        .then((res) => res.data.data);
      return shipment;
    },
    shipmentsByUser: async (root, args) => {
      const { user } = args;
      const shipments = await axios
        .get(shipmentUrl + "userShipments/" + user)
        .then((res) => res.data.data);
      return shipments;
    },
    // Kyc
    getKycImage: async (_, { filename }) => {
      try {
        const response = await axios.get(urlKycMs + "/get-image/" + filename);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
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
      }
    },
  },
  Mutation: {
    // Transactions
    createTransaction: async (_, { input }) => {
      try {
        const response = await axios.post(urlTransactionsMs + "/p2p", input);
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
      }
    },
    createChargeOrder: async (_, { input }) => {
      try {
        const response = await axios.post(
          urlTransactionsMs + "/create-order/",
          input
        );
        return response.data.order;
      } catch (error) {
        console.error("An error occurred:" + error);
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
    signUpUser: async (root, args) => {
      const { user } = { ...args };
      const response = await axios
        .post(userUrl + "/signin", user)
        .then((res) => res.data.data);
      return response;
    },
    signUpUser: async (root, args) => {
      const { user } = { ...args };
      const response = await axios
        .post(userUrl + "/signup", user)
        .then((res) => res.data.data);
      return response;
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
      const shipment = { ...args };
      const response = await axios
        .post(shipmentUrl, shipment)
        .then((res) => res.data.data);
      return response;
    },
    updateShipment: async (root, args) => {
      const id = args.id;
      const shipment = { ...args };
      const response = await axios
        .patch(shipmentUrl + "/update/" + id, shipment)
        .then((res) => res.data.data);
      return response;
    },
    deleteShipment: async (root, args) => {
      const id = args.id;
      const response = await axios
        .delete(shipmentUrl + "/" + id)
        .then((res) => res.data.data);
      return response;
    },
    deleteImage: async (_, { filename }) => {
      try {
        const response = await axios.delete(
          urlKycMs + "/delete-image/" + filename
        );
        return response.data;
      } catch (error) {
        console.error("An error occurred:" + error);
      }
    },
  },
};
