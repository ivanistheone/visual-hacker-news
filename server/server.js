var serveStatic = require('koa-static');
var options = {
	maxage:7200,
};
var compress = require('koa-compress')
var koa      = require('koa');
var app      = koa();

app.use(compress()); 
app.use(serveStatic('./public',options));

app.listen(process.env.PORT || 9000);
 
console.log('listening on port',process.env.PORT || 9000);


// We make sure that thumbnails are cached
require('./fetchImages').run();