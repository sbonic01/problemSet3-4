var http = require('http');
var url = require("url");
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
var path = url.parse(req.url).pathname;
var querystr = url.parse(req.url, true).query.place;
res.write("url is: " + path + "<hr>");
  if (path == "/")
  {
    res.write('Please enter the name of a place (city) or zip code.')
    s = "<form action='/process' method='get'>"+
            "<input type='text' name='place'><br>" +
            "<input type='submit'>" +
            "</form>";
	  res.write(s);
  }
  else if (path == "/process") {
    if (isNaN(querystr)) {
        res.write("You entered the place " + querystr);
    } else {
        res.write("You entered the zip code " + querystr);
    }
    res.write("<br><br>If only MongoDB could connect...");

    res.write("21");
    const MongoClient = require('mongodb').MongoClient;
    const url2 = "mongodb+srv://something123:something123@cluster0.swfkiih.mongodb.net/problemSet3-4?retryWrites=true&w=majority&appName=Cluster0";
    // const url2 = process.env.MONGODB_URI;
    
    res.write("25");
    try {
      MongoClient.connect(url2, async function(err, mydb) {
          res.write("27");
          if(err) { console.log(err); }
          else {
              var dbo = mydb.db("problemSet3-4");
              var collection = dbo.collection('places');
              res.write("In here");

              // // Check if the entry is a zip code or a place
              // isPlace = true;
              // if (isNaN(querystr)) {
              //     isPlace = false;
              // }

              // // It sounds like whether they enter a zip code or place we still output the place and all the associated zip codes
              // // Handle place
              // if (isPlace) {
              //     theQuery = {place: querystr};
              // } else {
              //     theQuery = {zips: querystr};
              // }
              // result = collection.find(theQuery);

              // // If place is not in db, write some message
              // if ((await result.count() === 0)) {
              //     if (isPlace) {res.write('This place is not in our database');}
              //     else {res.write('This zipcode is not in our database');}
              // } else {
              //     result.toArray(function(err, items) {

              //         if (err) {
              //           res.write("Error: " + err);
              //         } 
              //         else 
              //         {
              //           res.write("Results: ");
              //           for (i=0; i<items.length; i++)
              //               res.write(items[i].place + ': ' + items[i].zips);		
              //         }
              //     })   
              // }
              mydb.close();
          }
      })
    } catch(error) {
      console.log(error);
    }
    
    res.write("72");

  }
  res.end();

}).listen(port);
