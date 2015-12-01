// var app = angular.module('nameApp', []);
// app.controller('myCtrl', function ($scope) {
//     $scope.firstName = "John";
//     $scope.lastName = "Doe";
// });

// var json = { 
//     "records": [ 
//         {"Name":"Alfreds Futterkiste","City":"Berlin","Country":"Germany"}, 
//         {"Name":"Ana Trujillo Emparedados y helados","City":"México D.F.","Country":"Mexico"}, 
//         {"Name":"Antonio Moreno Taquería","City":"México D.F.","Country":"Mexico"}, 
//         {"Name":"Around the Horn","City":"London","Country":"UK"}, 
//         {"Name":"B's Beverages","City":"London","Country":"UK"}, 
//         {"Name":"Berglunds snabbköp","City":"Luleå","Country":"Sweden"}, 
//         {"Name":"Blauer See Delikatessen","City":"Mannheim","Country":"Germany"}, 
//         {"Name":"Blondel père et fils","City":"Strasbourg","Country":"France"}, 
//         {"Name":"Bólido Comidas preparadas","City":"Madrid","Country":"Spain"}, 
//         {"Name":"Bon app'","City":"Marseille","Country":"France"}, 
//         {"Name":"Bottom-Dollar Marketse","City":"Tsawassen","Country":"Canada"}, 
//         {"Name":"Cactus Comidas para llevar","City":"Buenos Aires","Country":"Argentina"}, 
//         {"Name":"Centro comercial Moctezuma","City":"México D.F.","Country":"Mexico"}, 
//         {"Name":"Chop-suey Chinese","City":"Bern","Country":"Switzerland"}, 
//         {"Name":"Comércio Mineiro","City":"São Paulo","Country":"Brazil"} 
//     ] 
// };
// var app = angular.module('tableApp', []);
// app.controller('tableCtrl', function ($scope) {
//     $scope.json = json;
//     console.log($scope);
// });

// var app = angular.module('myApp', []);
// app.controller('formCtrl', function($scope) {
//     $scope.master = {firstName:"John", lastName:"Doe"};
//     $scope.reset = function() {
//         $scope.user = angular.copy($scope.master);
//     };
//     $scope.reset();
// });


var form = angular.module('formApp', []);
form.controller('formCtrl', function ($scope) {
    $scope.username = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});


