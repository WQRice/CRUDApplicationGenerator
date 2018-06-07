'use strict';
var ejs  = require('ejs');
var fs   = require('fs-extra');
var util = require('util');

module.exports=function(jpaFile,packageName){
// var jpaFile='cake.jpa'

// fs.readdirSync('EmployeeCMD').forEach(file => {
//   console.log(file);
// });
fs.removeSync('Sample');
fs.copySync('EmployeeCMD', 'Sample');

var parseString = require('xml2js').parseString;
var xml = fs.readFileSync('XML/'+jpaFile, 'utf-8');
var jpaRoot='jpa:entity-mappings';
// var packageName='sample';

parseString(xml, function (err, result) {
	//console.log(result[0]);
    //console.log(result[0].length);
//     console.log(util.inspect(result, false, null));
    var className=result[jpaRoot]['jpa:entity'][0]['$']['class'];
    var basic=result[jpaRoot]['jpa:entity'][0]['jpa:attributes'][0]['jpa:basic'];
    var jpaid=result[jpaRoot]['jpa:entity'][0]['jpa:attributes'][0]['jpa:id'][0]['$']['id'];

    
    for(var j in basic){
    	console.log(basic[j]['$']['name']+' is of type '+basic[j]['$']['attribute-type']);
// 		console.log(j);
    }
    
    var data={'PACKAGENAME':packageName, 'CLASSNAME':className[0].toUpperCase()+className.slice(1),'JPAID':jpaid,'BASIC':basic};
    // mkdirp('/tmp/foo/bar/baz', function (err) {
//     	if (err) console.error(err)
//     });
    
    //produce controller
    var template = fs.readFileSync('template/controller.ejs', 'utf-8');
	var file = ejs.render ( template , data );
	fs.outputFileSync("Sample/src/main/java/OITWeb/"+packageName+"/controller/"+className+'Controller.java', file, 'utf8');
	
	//produce entity class
	var template = fs.readFileSync('template/entity.ejs', 'utf-8');
	var file = ejs.render ( template , data );
	fs.outputFileSync("Sample/src/main/java/OITWeb/"+packageName+"/model/"+className+'.java', file, 'utf8');
	
	//produce exception class
	var template = fs.readFileSync('template/exception.ejs', 'utf-8');
	var file = ejs.render ( template , data );
	fs.outputFileSync("Sample/src/main/java/OITWeb/"+packageName+"/exception/"+'ResourceNotFoundException.java', file, 'utf8');
	
	//produce repository class
	var template = fs.readFileSync('template/repository.ejs', 'utf-8');
	var file = ejs.render ( template , data );
	fs.outputFileSync("Sample/src/main/java/OITWeb/"+packageName+"/repository/"+className+'Repository.java', file, 'utf8');
	
	//produce repository class
	var template = fs.readFileSync('template/application.ejs', 'utf-8');
	var file = ejs.render ( template , data );
	fs.outputFileSync("Sample/src/main/java/OITWeb/"+packageName+"/"+className+'Application.java', file, 'utf8');




	//produce the back-end dynamic file

	
    var template = fs.readFileSync('template/index_html_template.ejs', 'utf-8');
    var file = ejs.render ( template , data );
    fs.writeFileSync("Sample/src/main/resources/static/index.html", file, 'utf8');

    var template = fs.readFileSync('template/appController_js_template.ejs', 'utf-8');
    var file = ejs.render ( template , data );
    fs.writeFileSync("Sample/src/main/resources/static/js/appController.js", file, 'utf8');


     var template = fs.readFileSync('template/view_html_template.ejs', 'utf-8');
     var file = ejs.render ( template , data );
     fs.writeFileSync("Sample/src/main/resources/static/js/views/"+className+"Table.html", file, 'utf8');
  
    var template = fs.readFileSync('template/viewModel_js_template.ejs', 'utf-8');
    var file = ejs.render ( template , data );
    fs.writeFileSync("Sample/src/main/resources/static/js/viewModels/"+className+"Table.js", file, 'utf8');	
	
 });
}