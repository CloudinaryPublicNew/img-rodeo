const express = require('express'),
      webtask = require('webtask-tools'),
      request = require('request'),
      cloudinary = require('cloudinary');

const app = express();

const randomItem = ( function( array ) {
	const randomIndex = Math.floor( Math.random() * array.length );
	return array[ randomIndex ];
} );

const addTransformations = function( cldUrl, transformations ) {
	return cldUrl.replace( /(v\d{10})/, transformations + '/$1' );
}

app.get('/:size', function ( req, res ) {

	const s = req.params.size.split( 'x' );
	const width = s[ 0 ];
	const height = s[ 1 ];
	const transformations = req.query.t;
	const folder = req.query.f;
	const defaultColors = [ 'rgb:56cbb7', 'rgb:5ac8ce', 'rgb:6dc3e2', 'rgb:85bcf0', 'rgb:9fb3f7', 'rgb:b7aaf8', 'rgb:cca1f0', 'rgb:de99e1', 'rgb:ed93ca', 'rgb:f690ad', 'rgb:f9928d', 'rgb:f59770', 'rgb:e9a15a', 'rgb:d6ac50', 'rgb:bcb856', 'rgb:9ec168', 'rgb:80c881', 'rgb:65cb9c' ];
	const colors = ( req.query.c ? req.query.c.split( ',' ) : defaultColors );
	
	const getUrl = ( function() {
		return new Promise( function( resolve, reject ) {
				
			if ( folder ) {
	
				cloudinary.config({
					"cloud_name": req.webtaskContext.secrets.CL_NAME,
					"api_key": req.webtaskContext.secrets.CL_KEY,
					"api_secret": req.webtaskContext.secrets.CL_SECRET
				});
	
				cloudinary.v2.api.resources( { type: 'upload', prefix: folder + '/', max_results: 500 }, function( error, result ) {
	
					// res.send(result);
					const randomResource = randomItem( result.resources );
					const originalUrl = randomResource.secure_url;
			
					resolve(
						addTransformations(
							originalUrl,
							`c_fill,g_auto,w_${ width },h_${ height },q_auto`
						)
					);
		
				} );
	
			} else { // use a random color
		
				const oneTransparentPixel = 'https://eric-cloudinary-res.cloudinary.com/image/upload/v1520024646/_.png';
				
				const textSize = Math.round( parseInt( width ) / 10 );
				// console.log({ textSize });
				// const strokeSize = Math.round( textSize / 10 );
		
				resolve( 
					addTransformations(
						oneTransparentPixel,
						`b_${ randomItem( colors ) },w_${ width },h_${ height }/$w_w,$h_h,co_rgb:00000080,l_text:Roboto_${ textSize }:$(w)%20×%20$(h)`
					)
				);

			}
		
		} );
	} );
	
	getUrl().then( ( url ) => {

		let theUrl;
		if ( transformations ) {
			theUrl = addTransformations( url, transformations );
		} else {
			theUrl = url;
		}

		// don't cache
		res.header( "Cache-Control", "no-cache, no-store, must-revalidate" );

		// res.send( theUrl );
		// console.log({ theUrl });
		request( theUrl ).pipe( res );

	} );
	
} );

module.exports = webtask.fromExpress(app);

