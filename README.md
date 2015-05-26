# gulp-git-deploy
Run deploy tasks with gulp if there are any changes on the Git repo.
 
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

Type:`string`

Default:`'origin'`

### name
Set the branch name

Type:`string`

Default:`'master'`

