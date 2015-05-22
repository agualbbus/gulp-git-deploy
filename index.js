// through2 is a thin wrapper around node transform streams
var git = require('gulp-git');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-git-deploy';



function gitDeploy(opt, tasks){
  
  opt = opt || {};

  opt = {
    by: opt.by || 'branch',
    remote: opt.remote || 'origin',
    name: opt.name || 'master'
  }

  //first fetch all

  git.fetch(opt.remote, '', {arg: '--all'}, function(err){
    if (err) throw new PluginError(PLUGIN_NAME, err);
  })


  if(opt.by == 'branch' ){



  }



}

module.exports = gitDeploy;

