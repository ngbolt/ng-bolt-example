(function() {
'use strict';

  angular
    .module('app.core')
    .factory('sharedFactory', sharedFactory);

  sharedFactory.$inject = ['$http'];
  function sharedFactory($http) {
    var factory = {};

    //Assign function(s) to factory to make it available to anyone requiring this factory in their
    // service or controller.
    factory.someSharedFunction = someSharedFunction;
    factory.getSampleData = getSampleData;
    
    return factory;

    function someSharedFunction(){
      //do some work
    }

    function getSampleData(){
        return $http.get('data/sample.json').then(function(res){
          return res.data;
        });
    }
  }
})();