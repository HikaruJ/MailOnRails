(function() {
    "use strict";

    var modalService = function($log, $uibModal) {
        var ModalController = function($scope, $uibModalInstance, message) {
            $scope.message = message;

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        };

        var service = {
            alert: alert,
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