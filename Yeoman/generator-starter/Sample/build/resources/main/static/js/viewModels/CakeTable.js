/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * noteTable module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojlabel'],
function(oj, ko, $)
{   
  function viewModel() {
      var self = this;
      //

      var CakeArray = [];
      $.get('http://localhost:8080/api/Cake',function(data) {
          //alert(data);
          //console.log(data);
          //console.log(self.deptObservableArray());

          //self.deptObservableArray([]);
          console.log("lll");
          //console.log(self.deptObservableArray().length);

          for (var i = 0; i < data.length; i++) {
              console.log("add data");

              CakeArray.push({

              'Cake_Id': data[i].id,

              
              'Cake_color': data[i].color,            
              'Cake_price': data[i].price,                                                                                               
              'Cake_mass': data[i].mass
              });
          }
      });
      // var deptArray = [{NoteId: 1001, NoteTitle: 'ADFPM 1001 neverending', NoteContent: 'funny', CreateAt: 200, UpdatedAt: 300},
      //     {NoteId: 556, NoteTitle: 'BB', NoteContent: 'funny', CreateAt: 200, UpdatedAt: 300},
      //     {NoteId: 10, NoteTitle: 'Administration', NoteContent: 'funny', CreateAt: 200, UpdatedAt: 300},
      //     {NoteId: 20, NoteTitle: 'Marketing', NoteContent: 'funny', CreateAt: 200, UpdatedAt: 300},
      //     {NoteId: 130, NoteTitle: 'Human Resources15', NoteContent: 'funny', CreateAt: 200, UpdatedAt: 300}];
      self.CakeObservableArray = ko.observableArray(CakeArray);

      // var testfun = function(){
      //     console.log("test");
      //     console.log(self.deptObservableArray());
      // };

      self.dataprovider = new oj.ArrayDataProvider(self.CakeObservableArray, {idAttribute: 'Cake_Id'});

      //add to the observableArray
      self.addRow = function () {
          var Cake = {
              'Cake_Id': self.inputCakeId(),
              
              'Cake_color': self.inputCakecolor(),              
              'Cake_price': self.inputCakeprice(),              
              'Cake_mass': self.inputCakemass()          
            };

          var Cake2database = $.ajax({
              type: "POST",
              contentType: 'application/json',
              url: "http://localhost:8080/api/Cake",
              data: JSON.stringify(
                  {
              'Id': self.inputCakeId(),
              
              'color': self.inputCakecolor(),              
              'price': self.inputCakeprice(),              
              'mass': self.inputCakemass()

                  }),
              dataType: "json",
              success: function (returndata) {
                  console.log(returndata);
                  self.CakeObservableArray.push(
                      {

             'Cake_Id': returndata.id,

              
              'Cake_color': returndata.color,            
              'Cake_price': returndata.price,                                                                                               
              'Cake_mass': returndata.mass
                   
                      });
                  console.log('length' + self.CakeObservableArray().length);

              }
          });


      };


      //used to update the fields based on the selected row
      self.updateRow = function () {
          var element = document.getElementById('table');
          var currentRow = element.currentRow;

          if (currentRow != null) {
              // DO PUT
              $.ajax({
                  type: "PUT",
                  contentType: 'application/json; charset=utf-8',
                  url: "http://localhost:8080/api/Cake/" + self.inputCakeId(),
                  data: JSON.stringify(
                      {
               'Id': self.inputCakeId(),
              
              'color': self.inputCakecolor(),              
              'price': self.inputCakeprice(),              
              'mass': self.inputCakemass()
                      }
                  ),
                  dataType: 'json',
                  success: function (returndata) {
                      console.log(returndata);
                      self.CakeObservableArray.splice(currentRow['rowIndex'], 1,
                          {

             'Cake_Id': returndata.id,

              
              'Cake_color': returndata.color,            
              'Cake_price': returndata.price,                                                                                               
              'Cake_mass': returndata.mass
                   
 
                          });

                  }

              })


              // self.deptObservableArray.splice(currentRow['rowIndex'], 1, {
              //          'NoteId': self.inputNoteId(),
              //          'NoteTitle': self.inputNoteTitle(),
              //          'NoteContent': self.inputNoteContent(),
              //          'CreateAt': self.inputCreateAt(),
              //          'UpdatedAt': self.inputUpdateAt()
              //       });
          }
      };

      //used to remove the selected row
      self.removeRow = function () {
          var element = document.getElementById('table');
          var currentRow = element.currentRow;


          if (currentRow != null) {
              $.ajax({
                  url: "http://localhost:8080/api/Cake/" + self.CakeObservableArray()[currentRow['rowIndex']].Cake_Id,
                  type: "DELETE",
                  success: function (response) {
                      console.log("delete success");
                      console.log(response);
                      self.CakeObservableArray.splice(currentRow['rowIndex'], 1);

                  },

                  error: function (e) {
                      console.log(currentRow['rowIndex']);
                      console.log(e);

                  }
              })
          }


      };



      //intialize the observable values in the forms
      self.inputCakeId = ko.observable();

      
      self.inputCakecolor = ko.observable();      
      self.inputCakeprice = ko.observable();      
      self.inputCakemass = ko.observable();                                                                                         


      self.currentRowListener = function(event)
      {
          var data = event.detail;
          if (event.type == 'currentRowChanged' && data['value'] != null)
          {
              var rowIndex = data['value']['rowIndex'];
              var Cake = vm.CakeObservableArray()[rowIndex];
              vm.inputCakeId(Cake['Cake_Id']);

              
              vm.inputCakecolor(Cake['Cake_color']);              
              vm.inputCakeprice(Cake['Cake_price']);              
              vm.inputCakemass(Cake['Cake_mass']);              

              //console.log(event)
              //alert("It is working")
          }
      };

      //used to get all notes
      // self.getnotes =
      //     function(){
      //         var jqxhr=$.get('http://localhost:8080/api/notes',function(data){
      //             //alert(data);
      //             //console.log(data);
      //             //console.log(self.deptObservableArray());
      //
      //             self.deptObservableArray.removeAll();
      //             console.log("lll");
      //             //console.log(self.deptObservableArray().length);
      //             if(self.deptObservableArray().length<1){
      //             for (var i=0; i<data.length; i++) {
      //                 console.log("add data");
      //
      //                 self.deptObservableArray.push({
      //                     'NoteId': data[i].id,
      //                     'NoteTitle': data[i].title,
      //                     'NoteContent': data[i].content,
      //                     'CreateAt': data[i].createdAt,
      //                     'UpdatedAt': data[i].updatedAt
      //                 });
      //             }
      //             }
      //
      //             console.log(self.deptObservableArray());
      //
      //
      //         });
      //     };


  }

    var vm = new viewModel;






  //alert("model create!")
  
//  $(document).ready
//  (
//    function()
//    {
//      //ko.applyBindings(vm, document.getElementById('tableDemo'));
////      var table = document.getElementById('table');
////      table.addEventListener('currentRowChanged', vm.currentRowListener);
//        $('#table').on('currentRowChanged', vm.currentRowListener);
//    }
//  );
  
  return vm;
});	
