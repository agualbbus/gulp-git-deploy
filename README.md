# gulp-git-deploy
[![Circle CI](https://circleci.com/gh/agualbbus/gulp-git-deploy/tree/master.svg?style=shield)](https://circleci.com/gh/agualbbus/gulp-git-deploy/tree/master)
[![npm version](https://badge.fury.io/js/gulp-git-deploy.svg)](http://badge.fury.io/js/gulp-git-deploy)


<table>
<tr>
<td>Package</td><td>gulp-git-deploy</td>
</tr>
<tr>
<td>Description</td>
<td>Run deploy tasks with gulp if there are any changes on the Git repo. (gulpjs.com)</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>3.x</td>
</tr>
</table>

## Usage
### Install
    npm install gulp-git-deploy --save


## Example
```javascript
var gulp = require('gulp');
var gitDeploy = require('gulp-git-deploy');


gulp.task('build', function(){
 //your build stuff.
})

gulp.task('deploy',function(){

  return gitDeploy({remote: 'origin', name: 'master'}, function(){
    //put here whatever you want to do after merging, usually a build task.
    gulp.start('build')
  });

})


```

## Options

### remote

Set the git remote

Type: `string`

Default:`'origin'`

### name
Set the branch name

Type: `string`

Default: `'master'`

### reset
Reset head position(discards any change to your branch).

Type: `boolean`

Default: `true`

