const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb"),
  q = faunadb.query



const typeDefs = gql`
  type Query {
    getLollies: [lolly]!
    getLollyByPath(lollyPath: String!): lolly
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
      link: String!
    ): lolly
  }
`

var adminClient = new faunadb.Client({
  secret: "fnAD9IE5lKACBeLtaUmCu8lI24N12KT2GIeOpIYh",
})

const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("allLollies"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return {
            id: d.ts,
            color1: d.data.color1,
            color2: d.data.color2,
            color3: d.data.color3,
            reciever: d.data.reciever,
            sender: d.data.sender,
            message: d.data.message,
            link: d.data.link,
          }
        })


      } catch (err) {
        console.log(err)
      }
    },
    getLollyByPath: async (_, args) => {
      try {
        var result = await client.query(
          q.Get(q.Match(q.Index("Lolly_by_path"), args))
        )

        return result.data
      } catch (e) {
        return e.toString()
      }
    },

  },
  Mutation: {
    addLolly: async (_, { color1, color2, color3, sender, reciever, message, link }) => {
      console.log(color1, color2, color3, sender, reciever, message, link)
      const result = await adminClient.query(
        q.Create(q.Collection("Lollies"), {
          data: {
            color1,
            color2,
            color3,
            sender,
            reciever,
            message,
            link
          },
        })
      )

      return result.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()

