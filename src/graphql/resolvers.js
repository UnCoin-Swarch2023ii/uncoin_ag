import axios from "axios";

const urlKycMs = "http://localhost:3000/kyc-api";
const urlTransactionsMs = "http://localhost:3002/transactions-api";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    listTransactions: async () => {
      try {
        const response = await axios.get(urlTransactionsMs + "/");
        return response.data;
      } catch (error) {
        console.error("An error occurred");
      }
    },
    getTransactionsByUserId: async (_, { id }) => {
      try {
        const response = await axios.get(urlTransactionsMs + "/list/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred");
      }
    },
    getTransactionById: async (_, { id }) => {
      try {
        const response = await axios.get(urlTransactionsMs + "/detail/" + id);
        return response.data;
      } catch (error) {
        console.error("An error occurred");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }) => {
      try {
        const response = await axios.post(urlTransactionsMs + "/p2p", input);
        return response.data;
      } catch (error) {
        console.error("An error occurred");
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
        console.error("An error occurred");
      }
    },
  },
};
