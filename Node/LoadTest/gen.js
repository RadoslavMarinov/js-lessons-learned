const axios = require("axios").default;

(async () => {

  for (let i = 0; i < 100; i++) {
    console.log("I -> ", i)
    
    axios.post(
      "http://localhost:3000/api/v1/monet/bulk",
      {
        companies: ["259334", "215043", "35488576", "210458", "217696"],
        fields: [
          "company_id",
          "csrhub_official_name",
          "isin",
          "primary_industry",
          "ticker",
          "number_of_sources",
        ],
      },
      {
        timeout: 20 * 1000, // milliseconds
      }
    ).then((res) => {
      console.log(res.data)
    }).catch(err=>{
      console.error(err)
    });
  }



})();
