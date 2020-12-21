module.exports = {
  
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {        
        typeName: "GSG",        
        fieldName: "GetLollies",       
        url: "https://vriual-lolly-gatsby.netlify.app/.netlify/functions/newLolly",
      },
    }
  ],
}
   