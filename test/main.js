'use strict';

/* global describe, it, after, before, afterEach, beforeEach */

var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');
var exec = require('exec-chainable');
var gutil = require('gulp-util');
var GGdeploy = require('../');


describe('gulp-git-deploy', function(){
  var currentBranch;

  before(function(done){
    exec('git rev-parse --abbrev-ref HEAD')
    .then(function(stdout){
      console.log(stdout);
      currentBranch = stdout;
      return exec('git pull origin testing-branch');
    })
    .then(function(stdout){
      console.log(stdout);
      return exec('git checkout testing-branch ');
    })
    .then(function(stdout){
      console.log(stdout);
      done();
    });

  });




  it('should compare branch/origin with branch/local and be the same', function(done){
    var rev = {};
    exec('git rev-list HEAD -1')
    .then(function(stdout){
      rev.a = stdout;
      return GGdeploy({
        name: 'testing-branch',
        reset: false
      });
    })
    .then(function(){
      return exec('git rev-list HEAD -1');
    })
    .then(function(stdout){
      rev.b = stdout;
      rev.a.should.eql(rev.b);
      done();
    });
  });



  it('should compare branch/origin with branch/local and if different should merge', function(done){
    var rev = {};
    exec('git reset HEAD~1 --hard')
    .then(function(stdout){
      console.log(stdout);
      return exec('git rev-list HEAD -1');
    })
    .then(function(stdout){
      console.log(stdout);
      rev.a = stdout;
      return GGdeploy({
        name: 'testing-branch',
        reset: false
      });
    })
    .then(function(stdout){
      console.log(stdout);
      return exec('git rev-list HEAD -1');
    })
    .then(function(stdout){
      rev.b = stdout;
      console.log(rev.a, ' ', rev.b);
      rev.a.should.not.eql(rev.b);
      done();
    });
  });


  it('should compare branch/origin with branch/local and if different should merge then should apply callback', function(done){
    var rev = {};
    var cbText = 'I´m a callback';
    var cb ={
      result: null,
      func : function(){return  cbText}
    };


    exec('git reset HEAD~1 --hard')
    .then(function(stdout){
      console.log(stdout);
      return exec('git rev-list HEAD -1');
    })
    .then(function(stdout){
      rev.a = stdout;
      return GGdeploy({
        name: 'testing-branch',
        reset: false,
      }, cb.func);
    })
    .then(function(stdout){
      cb.result = stdout;
      return exec('git rev-list HEAD -1');
    })
    .then(function(stdout){
      rev.b = stdout;
      console.log(rev.a, ' ', rev.b);
      rev.a.should.not.eql(rev.b);
      cb.result.should.eql(cbText);
      done();
    });
  });



  after(function(done){
    exec('git reset --hard')
    .then(function(stdout){
      console.log(stdout);
      return exec('git checkout '+ currentBranch)
    })
    .then(function(stdout){
      console.log(stdout);
      done();
    });
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
