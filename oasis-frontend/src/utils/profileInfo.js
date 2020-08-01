import {getRequest} from "../utils/request"

export const getTrendInfo = (graphInfos, id) => {
  var recordedYears1 = [];
  var recordedYears2 = [];
  var recordedYears3 = [];
  var recordedYears4 = [];
  var recordedYears5 = [];

  getRequest("/api/report/paper/trend/year?baseline=activeness&refinement=" + id)
    .then(res => {
      if (res.status === 200) {
        res.data.forEach(data => {
          if (isNewData(recordedYears1, data.year)) {
            graphInfos[0].chartData.rows
              .push({
                "Year": parseInt(data.year),
                "Activeness": parseFloat(data.count).toFixed(1),
              });
          }
        })
      }
      else {
        graphInfos[0].chartData.rows = null;
      }
    });

  getRequest("/api/report/paper/trend/year?baseline=count&refinement=" + id)
    .then(res => {
      if (res.status === 200) {
        res.data.forEach(data => {
          if (isNewData(recordedYears2, data.year)) {
            graphInfos[1].chartData.rows
              .push({
                "Year": parseInt(data.year),
                "Papers": parseFloat(data.count).toFixed(1),
              });
          }
        })
      }
      else {
        graphInfos[1].chartData.rows = null;
      }
    });

  getRequest("/api/report/paper/trend/year?baseline=citation&refinement=" + id)
    .then(res => {
      if (res.status === 200) {
        res.data.forEach(data => {
          if (isNewData(recordedYears3, data.year)) {
            graphInfos[2].chartData.rows
              .push({
                "Year": parseInt(data.year),
                "Citation": parseFloat(data.count).toFixed(1),
              });
          }
        })
      }
      else {
        graphInfos[2].chartData.rows = null;
      }
    });

  getRequest("/api/report/paper/trend/year?baseline=heat&refinement=" + id)
    .then(res => {
      if (res.status === 200) {
        res.data.forEach(data => {
          if (isNewData(recordedYears4, data.year)) {
            graphInfos[3].chartData.rows
              .push({
                "Year": parseInt(data.year),
                "Heat": parseFloat(data.count).toFixed(1),
              });
          }
        })
      }
      else {
        graphInfos[3].chartData.rows = null;
      }
    });

  getRequest("/api/report/paper/trend/year?baseline=H_index&refinement=" + id)
    .then(res => {
      if (res.status === 200) {
        res.data.forEach(data => {
          if (isNewData(recordedYears5, data.year)) {
            graphInfos[4].chartData.rows
              .push({
                "Year": parseInt(data.year),
                "H-index": parseFloat(data.count).toFixed(1),
              });
          }
        })
      }
      else {
        graphInfos[4].chartData.rows = null;
      }
    });
};

export const getPapersForProfile = (topRankingContent, id) => {
  getRequest("/api/paper/list?id=" + id)
    .then(res => {
      res.data.forEach(item => {
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

export const jump2Profile = ($router, type, id) => {
  var toPath = "/" + type + "-profile";
  $router.push({path: toPath, query: {id: id}});
};

export const isNewData = (recorderYears, year) => {
  if (!recorderYears.includes(year)) {
    recorderYears.push(year);
    return true;
  }
  return false;
};

export const getPieChartData = (data, id) => {
  getRequest("/api/field/distribution?id=" + id).then(res => {
    if (res.status === 200) {
      var total = 0;
      res.data.forEach(item => {
        total += item.count;
        data.rows.push({
          Fields: item.fieldName,
          Proportion: item.count,
        });
      });
      trimPieChartData(data.rows);

      if (data.rows.length > 20) {
        var trimedData = [];
        for (var i = 0; i < 19; i++) {
          trimedData.push(data.rows[i]);
          total -= data.rows[i].Proportion;
        }

        trimedData.push({
          Fields: "Others",
          Proportion: total,
        });
        data.rows = trimedData;
      }
    }
    else {
      data = null;
    }
  });
};

export const trimPieChartData = (data) => {
  data.sort(function (a, b) {
    return (b.Proportion - a.Proportion)
  });
};
