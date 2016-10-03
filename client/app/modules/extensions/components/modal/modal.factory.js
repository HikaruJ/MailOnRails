(function() {
    "use strict";

    var modalService = function($log, $uibModal) {
        var ModalController = function($scope, $uibModalInstance, message, method) {
            $scope.message = message;
            $scope.method = method;

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.confirm = function(method) {
                method();
                $uibModalInstance.close();
            };

            $scope.ok = function() {
                $uibModalInstance.close();
            };
        };

        var service = {
            alert: alert,
            confirm: confirm,
            info: info
        };

        return service;

        function alert(message, size) {
            var modalInstance = $uibModal.open({
                backdrop: true,
                backdropClick: true,
                controller: ModalController,
                keyboard: true,
                size: size,
                templateUrl: '/partials/extensions/components/modal/views/alert.view.html',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });

            modalInstance.result.then(function() {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function confirm(message, method, size) {
            var modalInstance = $uibModal.open({
                backdrop: true,
                backdropClick: true,
                controller: ModalController,
                keyboard: true,
                size: size,
                templateUrl: '/partials/extensions/components/modal/views/confirm.view.html',
                resolve: {
                    message: function() {
                        return message;
                    },
                    method: function() {
                        return method;
                    }
                }
            });

            modalInstance.result.then(function() {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function info(message, size) {
            var modalInstance = $uibModal.open({
                backdrop: true,
                backdropClick: true,
                controller: ModalController,
                keyboard: true,
                size: size,
                templateUrl: '/partials/extensions/components/modal/views/info.view.html',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });

            modalInstance.result.then(function() {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    };

    module.exports = modalService;
}());