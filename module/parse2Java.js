'use strict';
var ejs = require('ejs');
var fs = require('fs-extra');
var caseConvert=require("./CaseConvert");

module.exports = function (datas,outputPath,modulePath) {

    for (var i in datas) {
        //produce controller
        var template = fs.readFileSync(modulePath+'/backendTemplate/controller.ejs', 'utf-8');
        var file = ejs.render(template, datas[i]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + datas[i].PACKAGENAME.replace(/\./g,'/') + "/controller/" + datas[i].CLASSNAME + 'Controller.java', file, 'utf8');

        //produce entity class
        var template = fs.readFileSync(modulePath+'/backendTemplate/entity.ejs', 'utf-8');
        var file = ejs.render(template, datas[i]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + datas[i].PACKAGENAME.replace(/\./g,'/') + "/model/" + datas[i].CLASSNAME + '.java', file, 'utf8');

        //produce repository class
        var template = fs.readFileSync(modulePath+'/backendTemplate/repository.ejs', 'utf-8');
        var file = ejs.render(template, datas[i]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + datas[i].PACKAGENAME.replace(/\./g,'/') + "/repository/" + datas[i].CLASSNAME + 'Repository.java', file, 'utf8');
    }


    if (datas.length > 0) {
        //produce exception class
        var template = fs.readFileSync(modulePath+'/backendTemplate/exception.ejs', 'utf-8');
        var file = ejs.render(template, datas[0]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + datas[0].PACKAGENAME.replace(/\./g,'/') + "/exception/" + 'ResourceNotFoundException.java', file, 'utf8');

        //produce entry class
        var template = fs.readFileSync(modulePath+'/backendTemplate/application.ejs', 'utf-8');
        var file = ejs.render(template, datas[0]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + caseConvert.upFirst(datas[0].APPNAME)+ 'Application.java', file, 'utf8');

        var template = fs.readFileSync(modulePath+'/backendTemplate/repositoryAdapter.ejs', 'utf-8');
        var file = ejs.render(template, datas[0]);
        fs.outputFileSync(outputPath+"/src/main/java/OITWeb/" + datas[0].PACKAGENAME.replace(/\./g,'/') + "/repository/" + 'RepositoryAdapter.java', file, 'utf8');

        var template = fs.readFileSync(modulePath+'/backendTemplate/settings.ejs', 'utf-8');
        var file = ejs.render(template, datas[0]);
        fs.outputFileSync(outputPath+ "/" + 'settings.gradle', file, 'utf8');
    }
}