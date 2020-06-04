/*jshint sub:true*/
/*jshint asi:true*/

(function () {

	'use strict';

    angular.module("UtilService",[]).service("utilService",["$http","$q","toastr","blockUI", 
                function($http, $q, toastr, blockUI){

        var service = {};
        var baseURL = 'http://13.126.99.152:8070/';

        service.callGetRequest = function (url){

            var differd = $q.defer();
            service.contentLoader(true);

            $http({
                method : "GET",
                url : baseURL + url
            }).then(function(response){

                service.contentLoader(false);
                differd.resolve(response);

            },function(error){
                service.contentLoader(false);
                service.alert("Internal Error", "error");
            });
            return differd.promise;
        };

        service.callPostRequest = function (url ,data){

            var differd = $q.defer();
            service.contentLoader(true);

            $http({
                method : "POST",
                url : baseURL + url,
                data : data
            }).then(function(response){

                service.contentLoader(false);
                differd.resolve(response);

            },function(error){
                
                service.contentLoader(false);
                service.alert("Internal Error", "error");
            });
            return differd.promise;
        };
        
        service.alert = function (message,statusMSG){

            if(statusMSG == 'success'){
                toastr.success(message,"",{timeOut: '3000'});
            }else if(statusMSG == 'warning'){
                toastr.warning(message,"",{timeOut: '3000'});
            }else if(statusMSG == 'error'){
                toastr.error(message,"",{timeOut: '3000'});
            }else{
                toastr.info(message,"",{timeOut: '3000'});
            }
        }

        service.contentLoader = function (option) {

            if(option == true){
                blockUI.start();
            }
            else{
                blockUI.stop();
            }
        }

        return service;

    }]);

})();