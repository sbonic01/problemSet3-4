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
    res.write('Please enter the name of a place (city, state) or zip code.')
    s = "<form action='/process' method='get'>"+
            "<input type='text' name='place'><br>" +
            "<input type='submit'>" +
            "</form>";
	  res.write(s);
  }
  else if (path == "/process") {
    res.write ("Processing, the value of place is: " + querystr);
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://something123:something123@cluster0.swfkiih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    MongoClient.connect(url, async function(err, mydb) {
        if(err) { console.log(err); }
        else {
            var dbo = mydb.db("problemSet3-4");
            var collection = dbo.collection('places');

            // Check if the entry is a zip code or a place
            isPlace = true;
            if (isNaN(querystr)) {
                isPlace = false;
            }

            // It sounds like whether they enter a zip code or place we still output the place and all the associated zip codes
            // Handle place
            if (isPlace) {
                theQuery = {place: querystr};
            } else {
                theQuery = {zips: querystr};
            }
            result = collection.find(theQuery);

            // If place is not in db, write some message
            // if ((await result.count() === 0)) {
            //     if (isPlace) {res.write('This place is not in our database');}
            //     else {res.write('This zipcode is not in our database');}
            // } else {
            //     result.toArray(function(err, items) {

            //         if (err) {
            //           console.log("Error: " + err);
            //         } 
            //         else 
            //         {
            //           console.log("Results: ");
            //           for (i=0; i<items.length; i++)
            //               console.log(items[i].place + ': ' + items[i].zips);		
            //         }
            //     })   
            // }
            mydb.close();
        }
    })
    


  }
  res.end();

}).listen(port);
