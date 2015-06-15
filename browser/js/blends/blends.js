app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('blends', {
        url: '/blends',
        controller: 'BlendsController',
        templateUrl: 'js/blends/blends.html'
    });

});

app.controller('BlendsController', function ($scope, BlendsFactory, MicrosFactory) {
    $scope.allBlends = null;
    $scope.allMicros = null;
    $scope.selectedMicros = [];  
    $scope.blends = null;
    $scope.editedBlend = null;
    $scope.whichNameToGet = null;
    $scope.whichToEdit = null;
    $scope.newBlend = {
        name: "kitten",
        micros: [],
        price: 10
        };

    BlendsFactory.getAllBlends().then(function (blends) {
            $scope.allBlends = blends;
        });

    MicrosFactory.getAllMicros().then(function (micros){
        $scope.allMicros = micros; 
        for(var i = 0; i < $scope.allMicros.length; i++){
            var microObject = {
                id: $scope.allMicros[i]._id,
                selected: false
            };
            $scope.selectedMicros.push(microObject);
        }
    });


    $scope.logThis = function(something){
        console.log(something);
    };
    $scope.showAllBlends = function () {
        BlendsFactory.getAllBlends().then(function (blends) {
            
            $scope.blends = blends;
        });
    };
    $scope.showBlendById = function(blendid) {
        BlendsFactory.getBlendById(blendid).then(function (blend){
            $scope.blends = blend;
        });
    };
    $scope.showBlendByName = function(blendname) {
        BlendsFactory.getBlendByName(blendname).then(function (blend){
            $scope.blends = [blend];
            // $scope.image = blend.image;
        });
    };
    $scope.addBlend = function (blend) {
        var justIds = blend.micros.map(
            function(obj){
                return obj._id;
            }
        );
        blend.micros = justIds;
        BlendsFactory.createBlend(blend).then(function (newBlend){
            $scope.newBlend = {
                name: null,
                micros: [],
                price: null
                };
            
            BlendsFactory.getAllBlends().then(function (blends) {
                $scope.allBlends = blends;
            });   
        });
    };
    $scope.deleteBlend = function (id){
        BlendsFactory.deleteBlendById(id).then(function(){
            return;
        });
    };
    $scope.loadBlendToEdit = function (id){
        BlendsFactory.getBlendById(id).then(function (blend){
            $scope.editedBlend = blend;
        });
    };
    $scope.editBlend = function (id, blend){
        BlendsFactory.editBlendById(id, blend).then(function (blend){
            $scope.editedBlend = blend;
        });
    };

    $scope.refreshNewBlend = function (selectedMicro){
        var allMicrosIndexOfObject = null;
        for(var i = 0; i < $scope.allMicros.length; i++){
            if($scope.allMicros[i]._id === selectedMicro.id){
                allMicrosIndexOfObject = i; 
            }
        }
        var indexOfSelectedMicro = $scope.newBlend.micros.indexOf($scope.allMicros[allMicrosIndexOfObject]);
        if(selectedMicro.selected){
            if(indexOfSelectedMicro === -1){
                for(var j = 0; j < $scope.allMicros.length; j++){
                    if ($scope.allMicros[j]._id === selectedMicro.id){
                        $scope.newBlend.micros.push($scope.allMicros[j]);
                    }
                }
            }
        } else {
            if (indexOfSelectedMicro !== -1){
                $scope.newBlend.micros.splice(indexOfSelectedMicro, 1);
            }
        }
    };




});