'use strict';

var cluster = require('cluster');
var os      = require('os');

if ( cluster.isMaster ) {
    var numCPUs  = os.cpus().length;
    var timeouts = [];

    // We make sure that thumbnails are cached
    require('./fetchImages').run();

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.error(['The worker #'+worker.id+' has exited with exitCode ' + worker.process.exitCode]);
        clearTimeout(timeouts[worker.id]);
        // Don't try to restart the workers when disconnect or destroy has been called
        if(worker.suicide !== true) {
            console.log('Worker #' + worker.id + ' did not commit suicide, restarting');
            cluster.fork();
        }
    });
    cluster.on('disconnect', function(worker) {
        console.log('The worker #' + worker.id + ' has disconnected');
    });
}
else {
let serveStatic = require('koa-static');
let options     = {
    maxage : 7 * 24 * 60 * 60,
    };
let compress     = require('koa-compress');
let koa          = require('koa');
let app          = koa();
let publicFolder = "./public";

app.use(compress()); 
app.use(serveStatic('./'+publicFolder,options));
app.use(function *(next){
    var ctx = this;
    if (this.url.includes('/thumbnail/')) {
    
      let request   = require('request');
      let imageUrl='http://api.webthumbnail.org'+this.url.split('/thumbnail/')[1];
      this.response.body = request(imageUrl);
        
    };
});


app.listen(process.env.PORT || 9000);
 
console.log('listening on port',process.env.PORT || 9000);
}


