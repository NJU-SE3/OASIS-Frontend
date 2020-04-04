import {getRequest} from "../utils/request"

export const getTrendInfo = (graphInfos, id)=>{
  getRequest("/api/report/paper/trend/year?baseline=activeness&refinement=" + id)
    .then(res=>{
      res.data.forEach(data=> {
        graphInfos[0].chartData.rows
          .push({
            "Year": parseInt(data.year),
            "Activeness": parseFloat(data.count).toFixed(1),
          });
      });

    });
  getRequest("/api/report/paper/trend/year?baseline=count&refinement=" + id)
    .then(res=>{
      console.log(res);
      res.data.forEach(data=> {
        graphInfos[1].chartData.rows
          .push({
            "Year": parseInt(data.year),
            "Papers": parseFloat(data.count).toFixed(1),
          });
      });
    });
  getRequest("/api/report/paper/trend/year?baseline=citation&refinement=" + id)
    .then(res=>{
      res.data.forEach(data=> {
        graphInfos[2].chartData.rows
          .push({
            "Year": parseInt(data.year),
            "Citation": parseFloat(data.count).toFixed(1),
          });
      });
    });
  getRequest("/api/report/paper/trend/year?baseline=heat&refinement=" + id)
    .then(res=>{
      res.data.forEach(data=> {
        graphInfos[3].chartData.rows
          .push({
            "Year": parseInt(data.year),
            "Heat": parseFloat(data.count).toFixed(1),
          });
      });
    });
  getRequest("/api/report/paper/trend/year?baseline=H_index&refinement=" + id)
    .then(res=>{
      res.data.forEach(data=> {
        graphInfos[4].chartData.rows
          .push({
            "Year": parseInt(data.year),
            "H-index": parseFloat(data.count).toFixed(1),
          });
      });
    });
};

export const getPapersForProfile = (topRankingContent,id) => {
  getRequest("/api/paper/list?id=" + id)
    .then(res=>{
      res.data.forEach(item=> {
        topRankingContent.items.push({
          name: item.title,
          value: item.citationCount,
          id: item.id,
          link: item.pdfLink,
          values: [
            {
              type: "Citation",
              value: item.citationCount,
            },
          ],
        })
      });
    });
};

export const jump2Profile = ($router,type, id) => {
  var toPath = "/" + type + "-profile";
  $router.push({ path: toPath, query: { id: id }});
};
