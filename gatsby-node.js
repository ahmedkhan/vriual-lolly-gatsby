const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const lollyTemplate = path.resolve("./src/components/dynamicLollyPage.tsx")

  const { data } = await graphql(`
    {
      GetLollies {
        getLollies {
          color1
          color2
          color3
          link
          reciever
          sender
          message
        }
      }
    }
  `)

  data.GetLollies.getLollies.forEach( lolly => {
    createPage({
      component: lollyTemplate,
      path: `lollies/${lolly.link}`,
      context: {
        link: lolly.link,
        color1: lolly.color1,
        color2: lolly.color2,
        color3: lolly.color3,
        reciever: lolly.reciever,
        sender: lolly.sender,
        message: lolly.message,
      },
    })
  })
}

