var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );



function listPerformers( req, res )
{
var name_performer = "";
var db = new sqlite.Database( "telluride.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" +
"<body>" + 
"<table >" +
"<tr>" + "<th>Performer</th>" + "<th>Stage</th>" + "<th>Time</th>" + "</tr>";
db.each( "SELECT ID, PERFORMER, STAGE,  TIME FROM PERFORMANCE", function( err, row ) {
db.each( "SELECT NAME FROM PERFORMERS WHERE ID = " +
row.PERFORMER, function( err2, row2 ) {
name_performer = row2.NAME;
console.log(name_performer + "hi");
resp_text += "<tr>" + row2.NAME + "hi" + "</tr>";
console.log( row2.NAME);
});
 resp_text += 
resp_text += "<tr>" + "<td>" + name_performer + "</td>" + "<td>" + row.STAGE + "</td>" + "<td>" + row.TIME + "</td>" + "</tr>" ;

} );
db.close( function() {
console.log( "Complete! "+resp_text );
resp_text +="</table>" + "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
});
}
function serveFile( filename, req, res )
{
try
{
var contents = fs.readFileSync( filename ).toString();
}
catch( e )
{
console.log(
"Error: Something bad happened trying to open "+filename );
process.exit( 1 );
/* Return a 404 page */
}
res.writeHead( 200 );
res.end( contents );
}
function serverFn( req, res )
{
var filename = req.url.substring( 1, req.url.length );
if( filename == "" )
{
filename = "./index.html";
}
if( filename == "list_performers" )
{
listPerformers( req, res );
}
else
{
serveFile( filename, req, res );
}
}
var server = http.createServer( serverFn );

server.listen( 8080 );
