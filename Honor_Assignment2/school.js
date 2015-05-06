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
}


function addStudent( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var name_input = form_inputs[0].split( "=" );
    var year_input = form_inputs[1].split( "=" );
    var id_input = form_inputs[2].split( "=" );
    var StudentName = decodeURIComponent( 
        ( name_input[1] + '' ).replace( /\+/g, '%20' ) );
    var StudentYear = decodeURIComponent( 
        ( year_input[1] + '' ).replace( /\+/g, '%20' ) );
     var StudentId = decodeURIComponent( 
        ( id_input[1] + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd = "INSERT INTO STUDENTS ('NAME', 'YEAR', 'ID') VALUES ('"+StudentName+"', '"+StudentYear+"', '"+StudentId+"')";
    
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function listStudents( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
    "<table border ='2'>" +
    "<tr>" + "<th>Name</th>" + "<th>Year</th>" + "<th>Id</th>" + "</tr>";
    db.each( "SELECT * FROM STUDENTS", function( err, row ) 
    {
        resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + 
                    "<td>" + row.YEAR + "</td>" + 
                    "<td>" + row.ID + "</td>" + "</tr>" ;
    });
    db.close( function() 
    {
       console.log( "Complete! "+resp_text );
       resp_text +="</table>" +"</body>" + "</html>";
       res.writeHead( 200 );
       res.end( resp_text );
    });   
}

function addTeacher( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var name_input = form_inputs[0].split( "=" );
    var office_input = form_inputs[1].split( "=" );
    var id_input = form_inputs[2].split( "=" );
    var TeacherName = decodeURIComponent( 
        ( name_input[1] + '' ).replace( /\+/g, '%20' ) );
    var TeacherOffice = decodeURIComponent( 
        ( office_input[1] + '' ).replace( /\+/g, '%20' ) );
     var TeacherId = decodeURIComponent( 
        ( id_input[1] + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd = "INSERT INTO TEACHERS ('NAME', 'OFFICE', 'ID') VALUES ('"+TeacherName+"', '"+TeacherOffice+"', '"+TeacherId+"')";
    
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function listTeachers( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
    "<body>" +
    "<table border ='2'>" +
    "<tr>" + "<th>Name</th>" + "<th>Office</th>" + "<th>Id</th>" + "</tr>";
    db.each( "SELECT * FROM TEACHERS", function( err, row ) 
    {
        resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + 
                    "<td>" + row.OFFICE + "</td>" + 
                    "<td>" + row.ID + "</td>" + "</tr>" ;
    });
    db.close( function() 
    {
       console.log( "Complete! "+resp_text );
       resp_text +="</table>" +"</body>" + "</html>";
       res.writeHead( 200 );
       res.end( resp_text );
    });   
}

function addClass( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var name_input = form_inputs[0].split( "=" );
    var department_input = form_inputs[1].split( "=" );
    var id_input = form_inputs[2].split( "=" );
    var ClassName = decodeURIComponent( 
        ( name_input[1] + '' ).replace( /\+/g, '%20' ) );
    var ClassDepartment = decodeURIComponent( 
        ( department_input[1] + '' ).replace( /\+/g, '%20' ) );
     var ClassId = decodeURIComponent( 
        ( id_input[1] + '' ).replace( /\+/g, '%20' ) );
    var sql_cmd = "INSERT INTO CLASSES ('CLASSNAME', 'DEPARTMENT', 'ID') VALUES ('"+ClassName+"', '"+ClassDepartment+"', '"+ClassId+"')";
    
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added!!!</body></html>" );
}

function listClasses( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
    "<body>" +
    "<table border ='2'>" +
    "<tr>" + "<th>Name</th>" + "<th>Department</th>" + "<th>Id</th>" + "</tr>";
    db.each( "SELECT * FROM CLASSES", function( err, row ) 
    {
        resp_text += "<tr>" + "<td>" + row.CLASSNAME + "</td>" + 
                    "<td>" + row.DEPARTMENT + "</td>" + 
                    "<td>" + row.ID + "</td>" + "</tr>" ;
    });
    db.close( function() 
    {
       console.log( "Complete! "+resp_text );
       resp_text +="</table>" +"</body>" + "</html>";
       res.writeHead( 200 );
       res.end( resp_text );
    });  
}

function addEnrollment( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    console.log( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var class_input = form_inputs[0].split( "=" );
    var student_input = form_inputs[1].split( "=" );
    var ClassId = decodeURIComponent( 
        ( class_input[1] + '' ).replace( /\+/g, '%20' ) );
    var StudentId = decodeURIComponent( 
        ( student_input[1] + '' ).replace( /\+/g, '%20' ) );
    console.log("t"+(ClassId === parseInt(ClassId, 10)));
    console.log("t"+(StudentId === parseInt(StudentId, 10)));
        
    if(isNaN(parseInt(ClassId, 10)) || isNaN(parseInt(StudentId,10)))
    {
        res.writeHead( 200 );
        res.end( "<html><body>WRONG INPUT TYPE!</body></html>" ); 
    }
    else
    {
        var sql_cmd = "INSERT INTO ENROLLMENTS ('CLASSID', 'STUDENTID') VALUES ('"+ ClassId+"', '"+StudentId+"')";
        db.run( sql_cmd );
        db.close();
        res.writeHead( 200 );
        res.end( "<html><body>Added!!!</body></html>" ); 
    }
}

function listEnrollments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
    "<body>" +
    "<table border ='2'>" +
    "<tr>" + "<th>Class Id</th>" + "<th>Student Id</th>" + "</tr>";
    db.each( "SELECT * FROM ENROLLMENTS " + 
        "JOIN CLASSES ON CLASSES.ID = ENROLLMENTS.CLASSID " + 
        "JOIN STUDENTS ON STUDENTS.ID = ENROLLMENTS.STUDENTID ", 
        function( err, row ) 
    {
        console.log(err);
        console.log(row);
        resp_text += "<tr>" + "<td>" + row.CLASSNAME + "</td>" + 
                    "<td>" + row.NAME + "</td>" + "</tr>";
    });
    db.close( function() 
    {
       console.log( "Complete! "+resp_text );
       resp_text +="</table>" +"</body>" + "</html>";
       res.writeHead( 200 );
       res.end( resp_text );
    });
}

function listTeachingAssignments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
    "<html>" +
    "<body>" +
    "<table border ='2'>" +
    "<tr>" + "<th>Class Id</th>" + "<th>Teacher Id</th>" + "</tr>";
    db.each( "SELECT * FROM TEACHINGASSIGNMENTS", function( err, row ) 
    {
        resp_text += "<tr>" + "<td>" + row.CLASSID + "</td>" + 
                    "<td>" + row.TEACHERID + "</td>" + "<tr>";
    });
    db.close( function() 
    {
       console.log( "Complete! "+resp_text );
       resp_text +="</table>" +"</body>" + "</html>";
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
    if( filename == "list_students" || filename == "list_students?" )
    {
        listStudents( req, res );
    }
     else if( filename == "list_teachers" || filename == "list_teachers?" )
    {
        listTeachers( req, res );
    }
   else if( filename == "list_classes" || filename == "list_classes?" )
    {
        listClasses( req, res );
    }
   else if( filename == "list_enrollments" || filename == "list_enrollments?" )
    {
        listEnrollments( req, res );
    }
   else if( filename == "list_teachingassignments" || filename == "list_teachingassignments?" )
    {
        listTeachingAssignments( req, res );
    }
    else if( filename.substring( 0, 11 ) == "add_student" )
    {
        addStudent( req, res );
    }
    else if( filename.substring( 0, 11 ) == "add_teacher" )
    {
        addTeacher( req, res );
    }
    else if( filename.substring( 0, 9 ) == "add_class" )
    {
        addClass( req, res );
    }
    else if( filename.substring( 0, 14 ) == "add_enrollment" )
    {
        addEnrollment( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }

}

var server = http.createServer( serverFn );

server.listen( 8080 );