var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('exec-chainable');
var head={};

// Consts
const PLUGIN_NAME = 'gulp-git-deploy';

function fetchAndCompare(opt){
    //fetch
  return exec('git fetch '+opt.remote+' '+opt.name)

        //get local head
        .then(function (stdout){
          return exec('git rev-list '+opt.name+' -n 1')
        })

        //process local head and return remote head
        .then(function(stdout){
            head.local=stdout;
            console.log('local head is',head.local);

            return exec('git rev-list origin/'+opt.name+' -n 1');
        })
        .then(function(stdout){
            head.origin=stdout;
            return console.log('remote head is',head.origin);
        });
}




function merge(){
    if( head.origin !== head.local ){
      return exec('git merge origin/master ')
      .then(function(stdout){
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
    name: opt.name || 'master'
  }


  return fetchAndCompare(opt).then(function(){
    return merge();
  })
  .done(function(){
    return cb();
  });


}

module.exports = gitDeploy;
