module.exports = {
  
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {        
        typeName: "Lollies",        
        fieldName: "LOLLIES",       
        url: "https://vriual-lolly-gatsby.netlify.app/.netlify/functions/newLolly",
      },
    }
  ],
}
 