var femaledata = data;

function buildBubble() {
  console.log(femaledata)

  //Get first 20 records
  const slicedArray = data.slice(0, 20);
  console.log(slicedArray);

  // Get data needed from json
  var budget = slicedArray.map(d => d.budget);
  var revenue = slicedArray.map(d => d.revenue);
  var similarity = slicedArray.map(d => d.similarity_score);

  var title = slicedArray.map(d => d.title);

  // Build BUBBLE
  var data = [{
    x: revenue,
    y: budget,
    text: title,
    mode: 'markers',
    marker: {
      size: similarity * 100000,
      color: revenue,
      //colorscale: "RdBu"
    }
  }];
  var layout = {
    title: `Female Lead or Directed Film Recommendations`,
    font: { size: 13 },
    xaxis: { title: "Revenue" },
    yaxis: {title: "Budget"}
  };
    Plotly.newPlot('bubble', data, layout); 
}
// -------------------------------------------------- //
// Build Table
//Get a reference to the table body
var tbody = d3.select("tbody");

function buildTable() {
  d3.json("/api/similarity_scores").then((data, err) => {
    if (err) throw err;
    console.log(data);

    //Get first 15 records
    const slicedArray = data.slice(0, 10);
    console.log(slicedArray);

    var newData = [];
    slicedArray.forEach(obj => { 
    newData.push({"title": obj.title, "genres": obj.genres, "director": obj.director, "cast": obj.cast, "release_date": obj.release_date, 
                  "runtime": obj.runtime, "budget": obj.budget, "revenue": obj.revenue});  
    });
    console.log(newData);

    newData.forEach(obj => {
      var row = tbody.append("tr");
      Object.entries(obj).forEach(([key, value]) => row.append("td").text(value));
    });  
  });
}   
//------------------------------------------------------------
buildBubble();
//buildTable();