var femaledata = data;

// Build Table
//Get a reference to the table body
var tbody = d3.select("tbody");

console.log(femaledata)

// First 20 records - get data needed from json
var budget = [];
var revenue = [];
var similarity = [];
var title = [];
var genres = [];
var director = [];
var release = [];
var runtime = [];
var cast = [];

for (var i=0; i<20; i++) {
  title.push(femaledata[i].title);
  genres.push(femaledata[i].genres);
  director.push(femaledata[i].director);
  cast.push(femaledata[i].cast);
  release.push(femaledata[i].release_date);
  runtime.push(femaledata[i].runtime);
  budget.push(femaledata[i].budget);
  revenue.push(femaledata[i].revenue);
  similarity.push(femaledata[i].similarity_score);
}

var row;
for (var i=0; i<20; i++) {
  row = tbody.append("tr");
  row.append("td").text(title[i])
}
//object1 = JSON.parse(femaledata);

// var newData = [];
// object1.forEach(obj => { 
// newData.push({"title": obj.title, "genres": obj.genres, "director": obj.director, "cast": obj.cast, "release_date": obj.release_date, 
//             "runtime": obj.runtime, "budget": obj.budget, "revenue": obj.revenue});  
// });
// console.log(newData);

// newData.forEach(obj => {
//   var row = tbody.append("tr");
//   Object.entries(obj).forEach(([key, value]) => row.append("td").text(value));
// });  


// var newData = [];
// slicedArray.forEach(obj => { 
// newData.push({"title": obj.title, "genres": obj.genres, "director": obj.director, "cast": obj.cast, "release_date": obj.release_date, 
//             "runtime": obj.runtime, "budget": obj.budget, "revenue": obj.revenue});  
// });
// console.log(newData);

