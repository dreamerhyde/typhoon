var typhoonApp = angular.module('typhoon', []);

typhoonApp.controller('geoList', function ($scope, $http, $interval) {
  $scope.loadData = function () {
    $http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json').
      then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        var data = response.data.DataSet['diffgr:diffgram'][0].NewDataSet[0].CASE_SUMMARY;
        // console.log(data);
        $scope.events = [];
        angular.forEach(data, function(value, key) {
          $scope.events.push({
            'id': value['$']['diffgr:id'],
            'order': parseInt(value['$']['msdata:rowOrder']),
            'CaseComplete': value.CaseComplete[0],
            'CaseDescription': value.CaseDescription[0],
            'CaseLocationDistrict': value.CaseLocationDistrict[0],
            'CaseTime': value.CaseTime[0],
            'DPName':  value.DPName[0],
            'Name': value.Name[0],
            'PName': value.PName[0],
            'long': value.Wgs84X[0],
            'lat': value.Wgs84Y[0]
          });
        });
      }, function(response) {
        console.log(response.status);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };
  $scope.loadData();
  $interval( function(){ $scope.loadData(); }, 10000);
});

typhoonApp.controller('gmap', function ($scope, $http) {

});
