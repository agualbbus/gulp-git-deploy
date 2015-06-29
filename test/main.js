'use strict';

/* global describe, it, after, before, afterEach, beforeEach */

var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');
var exec = require('exec-chainable');
var gutil = require('gulp-util');
var git = require('../');


describe('gulp-git', function(){
  var repo = 'https://github.com/agualbbus/gulp-git-deploy-test.git';

  before(function(done){
    exec('git checkout -b testing-branch ')
    .then(function(stdout){
      done();
    });


  });

  after(function(){
    exec('git branch -d testing-branch ')
  });


});



//  it('should fetch a tag from remote origin', function(done){
//    git.fetch('origin', '', {cwd: './test/tmp'}, function(){
//      fs.open('./test/tmp/.git/refs/tags/v1.1.1', 'r', function(err, fd) {
//        should.not.exist(err);
//        fs.close(fd, function() {
//          done();
//        });
//      });
//    });
//  });
//
//  afterEach(function(done){
//    rimraf('./test/tmp', function(err){
//      if(err) return done(err);
//      done();
//    });
//  });
