const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
  query MyQuery {
    getLollies {
      getLollies {
          color1
          color2
          color3
          link
          sender
          reciever
          message
      }
    }
  }
  `)
  
  console.log(data)
  data.getLollies.getLollies.forEach(node => {
    createPage({
      path: `lolly/${node.link}`,
      component: path.resolve(`./src/components/dynamicLollyPage.tsx`),
      context: {
        color1: node.color1,
        color2: node.color2,
        color3: node.color3,
        link: node.link,
        message: node.message,
        sender: node.sender,
        reciever: node.reciever,
      },
    })
  })
}
