const express = require('express'),
      webtask = require('webtask-tools'),
      request = require('request'),
      cloudinary = require('cloudinary');

const app = express();

app.get('/:folderName/*?', function ( req, res ) {

	let transformations = req.params[0];

	cloudinary.config({
		"cloud_name": req.webtaskContext.secrets.CL_NAME,
		"api_key":  req.webtaskContext.secrets.CL_KEY,
		"api_secret": req.webtaskContext.secrets.CL_SECRET
	});

	cloudinary.v2.api.resources( { type: 'upload', prefix: req.params.folderName + '/' }, function( error, result ) {
	
		const resources = result.resources;
		const randomIndex = Math.floor( Math.random() * resources.length );
		const randomResource = resources[ randomIndex ];
		const originalUrl = randomResource.secure_url;
		let url = originalUrl;

		if ( transformations ) {
			transformations = transformations.replace( /([wh]_)/, 'c_fill,g_auto,$1' );
			if ( transformations.slice( -1 ) === '/' ) {
				transformations = transformations.slice( 0, -2 );
			}
			const transformedUrl = originalUrl.replace( /(\/v\d{10}\/)/, '/' + transformations + '$1' );
			url = transformedUrl;
		}
		
		// res.send( url );
		request( url ).pipe( res );
		
	} );

	//var url = `https://demo-res.cloudinary.com/${req.params.publicid}`;
	//request(url).pipe(res);

} );

module.exports = webtask.fromExpress(app);

