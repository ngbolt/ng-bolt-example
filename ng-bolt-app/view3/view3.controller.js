(function () {
  'use strict'

  angular.module('app.view3', [])
    .controller('View3Controller', View3Controller)
  ;

  View3Controller.$inject = ['sharedFactory'];

  function View3Controller(sharedFactory){
    var ctrl = this;

    activate();

    function activate(){
      //Retrieve and pretty print sample data as string. Save in ctrl.data for display in view.
      sharedFactory.getSampleData().then(function(data){
        ctrl.data = angular.toJson(data, true);
      })
    }
  }

})();
