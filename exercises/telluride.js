var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function formInputParser( url )
{
    inputs = {}
    var form_text = url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        inputs[ inp[0] ] = inp[1];
    }
    console.log( inputs );
    return inputs;
}

function addPerformance( req, res )
{
    var db = new sqlite.Database( "telluride2.sqlite" );
    console.log( req.url );
    formInputParser( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var perf = null, stage = null, time = null;
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        if( inp[0] == 'performer' ) {
            perf = inp[1];
        }
        else if( inp[0] == 'stage' ) {
            stage = inp[1];
        }
        else if( inp[0] == 'time' ) {
            time = inp[1]
        }
    }
    if( perf == null || stage == null || time == null )
    {
        res.writeHead( 200 );
        res.end( "ERROR" );
        return;
    }
    /* perf, stage numbers that exist in DB */
    var perf_exists = false;
    db.all( "SELECT COUNT(NAME) FROM PERFORMERS WHERE ID = "+perf,
        function( err, rows ) {
            perf_exists = rows[0]['COUNT(NAME)'] == 1;
        });
    if( !perf_exists )
    {
        // ....
    }
    // var sql_cmd = "INSERT INTO PERFORMANCE ('PERFORMER', 'STAGE', 'TIME') VALUES ('"+
    //     perf_input[1]+"', '"+
    //     stage_input[1]+"', '"+
    //     time_input[1]+"')";
    // db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function addPerformer( req, res )
{
    var db = new sqlite.Database( "telluride2.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var perf_input = form_inputs[0].split( "=" );
    /* perf_input[0] == "performer" */
    var performer = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd = "INSERT INTO PERFORMERS ('NAME') VALUES ('"+
        performer+"')";
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function listVendors( req, res )
{
    var db = new sqlite.Database( "telluride2.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>";
    db.each( "SELECT * FROM VENDORS", function( err, row ) {
        console.log( row );
	resp_text += row.ID;
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listPerformers( req, res )
{
    var db = new sqlite.Database( "telluride2.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>";
    db.each( "SELECT NAME FROM PERFORMERS", function( err, row ) {
        console.log( "perf "+row.NAME );
	resp_text += row.NAME;
    });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listPerformances( req, res )
{
    var db = new sqlite.Database( "telluride2.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>";
    db.each( "SELECT PERFORMERS.NAME as pname, * FROM PERFORMANCE "+
             "JOIN PERFORMERS ON PERFORMERS.ID = PERFORMANCE.PERFORMER "+
             "JOIN STAGES ON STAGES.ID = PERFORMANCE.STAGE",
        function( err, row ) {
            console.log( row );
	    resp_text += row.TIME + " " + row.PERFORMER + " " +
                row.STAGE;
        });
    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
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
        res.writeHead( 404 );
        res.end( "" );
        return;
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
    if( filename.substring( 0, 15 ) == "list_performers" )
    {
        listPerformers( req, res );
    }
    else if( filename.substring( 0, 17 ) == "list_performances" )
    {
        listPerformances( req, res );
    }
    else if( filename.substring( 0, 12 ) == "list_vendors" )
    {
        listVendors( req, res );
    }
    else if( filename.substring( 0, 13 ) == "add_performer" )
    {
        addPerformer( req, res );
    }
    else if( filename.substring( 0, 15 ) == "add_performance" )
    {
        addPerformance( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
