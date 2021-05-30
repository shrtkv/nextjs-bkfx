// pages/api/graphql.js
import { ApolloServer, gql } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { MongoClient } from 'mongodb';

require('dotenv').config();

const typeDefs = gql`
  type Movie {
    _id: ID!
    CompleteSearchTitle: String!
    VimeoId: String!
    original_title: String
    title: String
    release_date: String
    genre_ids: [String]
    id: String
    original_language: String
    overview: String!
    poster_path: String!
    vote_average: Float
    vote_count: Int
  }

  type Query {
    movies: [Movie]!
  }
`;

const resolvers = {
  Query: {
    movies(_parent, _args, _context, _info) {
      return _context.db
        .collection('movies')
        .findOne()
        .then(data => {
          return data.movies;
        });
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

let db;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db('blackflix-next'); // database name
      } catch (e) {
        console.log('--->error while connecting via graphql context (db)', e);
      }
    }

    return { db };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
