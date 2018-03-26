'use strict';

const path = require('path');
const exec = require('child_process').exec;

module.exports = function registerCompileTasks(gulp, compilerPath) {
    const compile = (configFile) => (done) => {
        const tsConfigPath = path.join(process.cwd(), configFile);
        
        exec(`${compilerPath} -p ${tsConfigPath}`, (error, stdout, stderr) => {
            if (error) {
                console.log('Upon compilation the following error occured:', stdout);
            }
            done();
        });
    };
    
    
    gulp.task('build-npm-bundle', compile('tsconfig.npm.json'));
}


