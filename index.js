var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('exec-chainable');
var escape = require('any-shell-escape');
var head = {};
var merged = false;
//var Q=require('q');


// Consts
var PLUGIN_NAME = 'gulp-git-deploy';




function resetHead(opt){
    if(opt.reset === true){
      return exec('git reset '+opt.name+' --hard ');
    }
   return exec(' ');
}



function fetchAndGetHeads(opt){
    //fetch
  var cmd='git fetch --all ';
  return exec(cmd)

        //get local head
        .then(function (stdout){

          console.log(stdout);
          return exec('git show -s --format=%cD '+opt.name);

        })

        //process local head and return remote head
        .then(function(stdout){

            head.local=new Date ( new Date( stdout ).toUTCString() );
            console.log('local head is',head.local);
            return exec('git show -s --format=%cD '+opt.remote+'/'+opt.name);


        })
        .then(function(stdout){
            head.origin= new Date ( new Date( stdout ).toUTCString() ) ;
            return console.log('remote head is',head.origin);
        });
}







function merge(opt){
    if( head.origin > head.local ){

      return resetHead(opt)

      .then(function(){
        return exec('git merge '+opt.remote+'/'+opt.name);
      })
      .then(function(stdout){
        merged = true;
        console.log(stdout);
      });

    }
    else{
      return console.log('nothing to do');
    }
}




function gitDeploy(opt, cb){

  if(!cb && typeof opt === 'function'){
    cb=opt;
    opt={};
  }

  opt = ( opt && typeof opt ==='object' ? opt : {} );
  cb = ( cb && typeof cb === 'function' ? cb : function(){} );


  opt = {
    remote: opt.remote || 'origin',
    name: opt.name || 'master',
    reset: ( typeof opt.reset === 'boolean' ? opt.reset : true )
  };


  return fetchAndGetHeads(opt)

  .then(function(){
    return merge(opt);
  })

  .done(function(){
    if( merged === true ){
      return cb();
    }
    else{
     return false;
    }

  });


}

module.exports = gitDeploy;
