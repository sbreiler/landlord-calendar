import { ApolloServer } from 'apollo-server';
import {createTypeDefs, createResolvers, createFakeData, allTypeDefs} from './helper';

const config = require('../../config.js');
const fakeData = createFakeData();

const server = new ApolloServer({
  typeDefs: createTypeDefs(...allTypeDefs),
  resolvers: createResolvers(fakeData)
});

server
  .listen({ port: config.graphQl.port })
  .then(({url}) => console.log(`Server running on port ${url}`));
