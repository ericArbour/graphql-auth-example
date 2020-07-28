const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const { DateFormatDirective, AuthDirective } = require("./directives");
const { createToken, getUserFromToken } = require("./auth");
const db = require("./db");

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    date: DateFormatDirective,
    auth: AuthDirective
  },
  subscriptions: {
    onConnect(params) {
      const token = params.authToken;
      const user = getUserFromToken(token);

      return { user, createToken };
    }
  },
  context({ req, connection }) {
    const baseContext = { ...db, pubSub };
    if (connection) return { ...baseContext, ...connection.context };

    const token = req.headers.authorization;
    const user = getUserFromToken(token);

    return { ...baseContext, user, createToken };
  }
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
