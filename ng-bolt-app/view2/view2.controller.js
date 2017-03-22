(function () {
  'use strict'

  angular.module('app.view2', [])
    .controller('View2Controller', View2Controller)
  ;

  View2Controller.$inject = ['BltApi', '$scope'];

  function View2Controller(BltApi, $scope){
    var ctrl = this;
    
    ctrl.title = 'View 2';

    BltApi.register(ctrl, 'View2Controller');

    $scope.$on('$destroy', function(){
      BltApi.unregister('View2Controller')
    })
  }

})();
