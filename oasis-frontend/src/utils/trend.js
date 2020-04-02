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