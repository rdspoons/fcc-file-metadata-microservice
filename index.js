var http    = require ( 'http' ) ,
    multer     = require ( 'multer' ) ;

var upload = multer ().single( 'myfile' ) ,
    port = 8080 ,
    page = `<DOCTYPE html>
<html lang="en-us">
<head>
	<title>File Metadata</title>
</head>
<body>
	<h1>File Metadata Microservice</h1>
	<p>Submit a file and see its size.</p>
	<form action="" method="post" enctype="multipart/form-data">
		<input type="file" name="myfile" />
		<input type="submit" />
	</form>
</body>
</html>` ;

var server = http.createServer ( function ( req , res ) {

	if (req.method == 'POST') {

		upload( req , res , function ( err ) {
			if( err ) res.end ( err ) ;

			if ( req.file ) {

				var out = { "size" : req.file.size } ;

				res.writeHead ( 200 , { 'Content-Type' : 'application/json' } ) ;

				res.end ( JSON.stringify ( out ) ) ;

			} else {

				res.writeHead ( 200 , { 'Content-Type' : 'text/html' } ) ;

	                	res.end ( page );

			}
	
		} ) ;

	} else {

		res.writeHead ( 200 , { 'Content-Type' : 'text/html' } ) ;

		res.end ( page );

	}

} ) ;

server.listen ( process.env.PORT || port ) ;
