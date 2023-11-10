import axios from "axios";

// const urlKycMs = "http://localhost:3000/kyc-api"; // Use service name "kyc_ms"
// const urlTransactionsMs = "http://localhost:3002/transactions-api"; // Use service name "transactions_ms"
// const shipmentUrl = "http://localhost:4000/billing-api"; // Use service name "billing_ms"

// const userUrl = "http://localhost:8080/auth-api/user"; // Use service name "users_ms" for user service
// const companyUrl = "http://localhost:8080/auth-api/company"; // Use service name "users_ms" for company service

const urlKycMs = "http://kyc_ms:3000/kyc-api"; // Use service name "kyc_ms"
const urlTransactionsMs = "http://transactions_ms:3002/transactions-api"; // Use service name "transactions_ms"
const shipmentUrl = "http://billing_ms:4000/billing-api"; // Use service name "billing_ms"

const userUrl = "http://usersMs:8080/auth-api/user"; // Use service name "users_ms" for user service
const companyUrl = "http://usersMs:8080/auth-api/company"; // Use service name "users_ms" for company service

export const resolvers = {
  Query: {
    // Transactions
    listTransactions: async (_, { token }) => {
      try {
        console.log(userUrl + "/validateToken/" + token);
        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);

        if (!isValid.data) throw new Error("Invalid token");
        // console.log("token is valid");
        const response = await axios.get(urlTransactionsMs);

        // get users info
        const { data } = response;

        // change receiver id and sender id for user name in each data object
        for (let i = 0; i < data.length; i++) {
          const sender = await axios.get(userUrl + "/get/" + data[i].senderId);
          const receiver = await axios.get(
            userUrl + "/get/" + data[i].receiverId
          );

          data[i].senderId =
            sender.data.username + " " + sender.data.userLastName;
          data[i].receiverId =
            receiver.data.username + " " + receiver.data.userLastName;
        }

        return data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    getTransactionsByUserId: async (_, { id, token }) => {
      try {
        // Verify token with auth-ms
        console.log(id, token);
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const { data } = await axios.get(urlTransactionsMs + "/list/" + id);

        // change receiver id and sender id for user name in each data object
        for (let i = 0; i < data.length; i++) {
          const sender = await axios.get(userUrl + "/get/" + data[i].senderId);
          const receiver = await axios.get(
            userUrl + "/get/" + data[i].receiverId
          );

          console.log(sender.data);
          console.log(receiver.data);

          data[i].senderId =
            sender.data.username + " " + sender.data.userLastName;
          data[i].receiverId =
            receiver.data.username + " " + receiver.data.userLastName;
        }

        return data;
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

        const { data } = await axios.get(urlTransactionsMs + "/detail/" + id);

        // change receiver id and sender id for user name in each data object
        const sender = await axios.get(userUrl + "/get/" + data.senderId);
        const receiver = await axios.get(userUrl + "/get/" + data.receiverId);

        data.senderId = sender.data.username + " " + sender.data.userLastName;
        data.receiverId =
          receiver.data.username + " " + receiver.data.userLastName;

        return data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    // Users
    userByDocument: async (_, { document, token }) => {
      try {
        // const user = await axios
        //   .get(userUrl + "/get/" + document)
        //   .then((res) => res.data.data);

        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const user = await axios.get(userUrl + "/get/" + document);
        return user.data;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
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

        // check that user has enough balance
        const { data } = await axios.get(userUrl + "/get/" + input.senderId);

        if (data.balance < input.amount)
          throw new Error("Insufficient balance");

        // get user data
        const sender = await axios.get(userUrl + "/get/" + input.senderId);
        const receiver = await axios.get(userUrl + "/get/" + input.receiverId);

        // update balance for sender and receiver
        await axios.put(userUrl + "/update/" + input.senderId, {
          ...sender.data,
          userName: sender.data.username,
          balance: sender.data.balance - input.amount,
        });

        await axios.put(userUrl + "/update/" + input.receiverId, {
          ...receiver.data,
          userName: receiver.data.username,
          balance: receiver.data.balance + input.amount,
        });

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
    signInUser: async (_, { input }) => {
      try {
        console.log(input);
        const response = await axios.post(userUrl + "/signin", input, null, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    signUpUser: async (_, { input }) => {
      try {
        const response = await axios.post(userUrl + "/signup", input);
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    updateUser: async (_, { document, input, token }) => {
      const isValid = await axios.post(userUrl + "/validateToken/" + token);
      if (!isValid.data) throw new Error("Invalid token");

      const response = await axios
        .put(userUrl + "/update/" + document, input)
        .then((res) => res.data.status);

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
      try {
        const { token, ...shipmentData } = args; // Destructure token from args

        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const shipment = { ...shipmentData };
        const response = await axios
          .post(shipmentUrl, shipment, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          })
          .then((res) => res.data.data);
        return response;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    updateShipment: async (root, args) => {
      try {
        const { token, id, ...shipmentData } = args; // Destructure token and id from args

        // Verify token with auth-ms
        const isValid = await axios.post(userUrl + "/validateToken/" + token);
        if (!isValid.data) throw new Error("Invalid token");

        const shipment = { ...shipmentData };
        const response = await axios
          .patch(shipmentUrl + "/update/" + id, shipment, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          })
          .then((res) => res.data.data);
        return response;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
    },
    deleteShipment: async (root, args) => {
      try {
        const { token, id } = args; // Destructure token and id from args
        const response = await axios
          .delete(shipmentUrl + "/" + id, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          })
          .then((res) => res.data.data);
        return response;
      } catch (error) {
        console.error("An error occurred:" + error);
        throw new Error(error);
      }
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
