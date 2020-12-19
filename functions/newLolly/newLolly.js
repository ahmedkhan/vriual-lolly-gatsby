const { ApolloServer, gql } = require('apollo-server-lambda')
const shortid = require("shortid")

 
const typeDefs = gql`
  type Query {
    getLollies: [lolly]
  }
  type lolly {
    id: ID!
    color1: String!
    color2: String!
    color3: String!
    sender: String!
    reciever: String!
    message: String!
    link: String!
  }
  type Mutation {
    addLolly(
      color1: String!
      color2: String!
      color3: String!
      sender: String!
      reciever: String!
      message: String!
    ): lolly
  }
`
 


const resolvers = {
  Query: {
    getLollies :async (root, args, context) =>{
       try{
          return{}


       } catch (err){
         console.log(err)
       }
    }
  },
  Mutation :{
    addLolly : async(_, { color1, color2, color3, sender, reciever, message }) =>{
      console.log(color1, color2, color3, sender, reciever, message)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()

