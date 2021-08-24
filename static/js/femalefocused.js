// from femaledata.js
var femaledata = data;
console.log(femaledata);

//-----------------------------------------------------------------//
// Function to build bubble plot
function buildBubble() {

  // Get needed data
  var revenue = femaledata.map(d => d.revenue);
  var budget = femaledata.map(d => d.budget);
  var similarity = femaledata.map(d => d.similarity_score*200);
  var title = femaledata.map(d => d.title);
  var genres = femaledata.map(d => d.genres);
  var director = femaledata.map(d => d.director);
  var release = femaledata.map(d => d.release_date);
  var runtime = femaledata.map(d => d.runtime);

  // Build BUBBLE
  var Hoverinfo = []
  for (i=0;i<director.length;i++){
    p = {"Title":title[i], "Genre": genres[i], "Director":director[i],
        "Release_Date":release[i],"Run_Time":runtime[i]+" min."}
    Hoverinfo.push(p)
  }
  var data = [{
    x: revenue,
    y: budget,
    text: Hoverinfo,
    type: 'scatter',
    mode: 'markers',
    marker: {
      size: similarity,
      color: revenue,
      colorscale: "Bluered",
    },
    hovertemplate:
    "<b>Title:</b> %{text.Title}<br><b>Genre:</b> %{text.Genre}<br><b>Director:</b> %{text.Director}<br><b>Release Date:</b> %{text.Release_Date} <br> <b>Run Time:</b>%{text.Run_Time}<extra></extra>"
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