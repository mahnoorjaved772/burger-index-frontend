import axios from "axios";

// Set the endpoint to your GraphQL server URL
const endpoint = "http://localhost:3000/graphql";

export const executeQuery = async (query, options = undefined) => {
  try {
    const response = await axios.post(endpoint, {
      query: query,
      variables: options,
    });

    console.log("GraphQL response ====>", response.data);
    return response.data; // Return the data part of the response which includes data or errors
  } catch (error) {
    console.error("Error executing GraphQL query ====>:", error);
  }
};
