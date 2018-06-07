var p2j=require('../../parse2Java');
var fs= require('fs-extra');
var jpaList;
var Generator = require('yeoman-generator');
module.exports = class extends Generator {
	// The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
	
    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
    this.log("This is inside /app");
    jpaList=fs.readdirSync('XML');
//     this.log(jpaList);
  }
  
  prompting() {
    return this.prompt([{
      type    : 'list',
      name    : 'jpaFile',
      message : 'Your jpaFile name:',
      choices : jpaList
    }, {
      type    : 'input',
      name    : 'packageName',
      message : 'Your package name:',
      default : 'sample', // Default to current folder name
      store   : true
    }]).then((answers) => {
    	fs.removeSync('Sample');
		fs.copySync('webStatic', 'Sample');
      	p2j(answers.jpaFile,answers.packageName);
    });
  }
  
 //  method2() {
//     this.log('method 2 just ran');
//   }
};