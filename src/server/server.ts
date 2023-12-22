import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./graphql";

export const server = new ApolloServer({
  resolvers,
  typeDefs,
});
