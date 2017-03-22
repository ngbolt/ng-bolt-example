(function() {
	'use strict';
	
	angular.module('app.main', [])
		.controller('MainController', MainController);

  /**
   * @ngdoc controller
   * @name MainController
   * @description The main controller for the main.template.html. App initialization and global
   * functionality should go here.
   *
   * @requires BltApi
   * @requires BltAuth
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/service/$location
   * @requires https://docs.angularjs.org/api/ng/service/$scope
   * @module app.main
   */
	function MainController(BltApi, BltAuth, $timeout, $location, $scope){
		var ctrl = this;
		
    ctrl.getStarted = getStarted;
		ctrl.openView = openView;
    ctrl.logout = logout;

    activate();

		/**
		 * @function activate
     * @description Automatically activates when the main template is added to the DOM. Set up inital
     * properties and optionally connect to the ngBolt authentication service.
     * @module MainController
		 */
		function activate(){
			if ($location.path() == '/' || $location.path() == '') {
        ctrl.loading = true;
      }
      
			ctrl.title = 'ngBolt Template';

      ctrl.search = {
        placeholder: 'Search',
        value: ''
      };

      // You can register the main controller to the window object for debugging purposes. This call allows you to open
      // the Chrome debugger console and type main.getStarted() or any of the other public functions on this
      // controller. This can be done on any controller, service or factory object.
      BltApi.register(ctrl, 'main');

      BltAuth.onauthenticate = function(){
        //App is active with an authenticated user. This is an opportunity to retrieve data and activate
        //services for this user.
      }

      BltAuth.connect();
		}

    /**
     * @function getStarted
     * @description Hide the loading screen and set the path of the first view.
     * @module MainController
     */
    function getStarted(){
      var defaultViewPath = '/view1';

      $location.path(defaultViewPath);

      ctrl.loading = false;
    }

		/**
		 * @function openView
     * @description Set the $location.path and optionally close any panels or modals.
		 * @param  {string} path - The path of the view to open.
		 * @param  {string} [id] - Id of the open panel or modal element that needs to close before changing the $location.path.
     * @module MainController
		 */
		function openView(path, id){
			var ms = 0;

			// If a panel is open, close it before switching views
			if(id){
				BltApi.publish(id, 'close');
				ms = 350;
			}

			// Switch views after the panel closes if one is open or immediately.
			$timeout(function(){
				$location.path(path);
			}, ms);
		}

    /**
     * @function logout
     * @description Logout of the application.
     * @module MainController
     */
    function logout(){
      api.publish('bltAuth', 'logout');
    }
	}

  MainController.$inject = ['BltApi', 'BltAuth', '$timeout', '$location'];
})();