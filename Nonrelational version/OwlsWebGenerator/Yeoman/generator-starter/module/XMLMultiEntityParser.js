'use strict';
var fs = require('fs-extra');
var datas;
// var util = require('util');

var entityMap = {};


module.exports = function (jpaFile, packageName) {
    datas = [];
    var parseString = require('xml2js').parseString;
    var xml = fs.readFileSync('XML/' + jpaFile, 'utf-8');
    var jpaRoot = 'jpa:entity-mappings';

    parseString(xml, function (err, result) {

        // console.log(util.inspect(result, false, null));

        //get needed data from XML
        for (var i in result[jpaRoot]['jpa:entity']) {
            var className = result[jpaRoot]['jpa:entity'][i]['$']['class'];
            var basic = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:basic'];
            var jpaid = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:id'][0]['$']['id'];
            var oneToMany = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:one-to-many'];
            var oneToOne = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:one-to-one'];
            var manyToOne = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:many-to-one'];
            var manyToMany = result[jpaRoot]['jpa:entity'][i]['jpa:attributes'][0]['jpa:many-to-many'];
            var entityId = result[jpaRoot]['jpa:entity'][i]['$']['id'];

            entityMap[entityId] = className;

            for (var j in basic) {
                console.log(basic[j]['$']['name'] + ' is of type ' + basic[j]['$']['attribute-type']);
            }
            console.log();

            datas.push({
                'PACKAGENAME': packageName,
                'CLASSNAME': className[0].toUpperCase() + className.slice(1),
                'JPAID': jpaid,
                'BASIC': basic,
                'ONETOMANY': oneToMany,
                'ONETOONE': oneToOne,
                'MANYTOONE': manyToOne,
                'MANYTOMANY': manyToMany,
                'ENTITYID': entityId
            });
        }

    });

    for (var i in datas) {
        datas[i]['IdToEntity'] = entityMap;
    }

    // console.log(util.inspect(datas, false, null));
    // console.log(datas.length);
    return datas;
}