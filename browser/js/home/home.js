app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'

    });
});

app.controller('HomeController', function ($scope, AuthService, $state) {

        console.log("the script is running.")
        console.log("checkout-button",$("#checkout-button"));
        $("#checkout-button").on('click', function(){
            console.log("You clicked the checkout button")
			$('html').append('<link rel="stylesheet" href="iframe.css" type="text/css" />')
            $('html').append("<div id='checkout-bg' class='checkout-fadein' style='background-color: gray; position: absolute; display: block; width: 100%; top: 0; left: 0; height: 100%; z-index: 9998;'></div>").show()     
            var framein = function(){
                $("<iframe id='tchopay-iframe' class='iframe-fadein' style='display: block; position: absolute; width: 20%; padding: 20px; top: 35%; left: 27.5%; right: 27.5%; background-color: white; border-radius: 30px; height: 600px; margin: 0 auto; z-index: 9999;' src='/checkout'></iframe>").appendTo($('html')).animate({top: "10%"}, 500, 'easeInOutBack')
                // $('html').append('<button type="button" class="iframe-fadein" id="close-button" style="">x<button>').animate({top: "10%"}, 500, 'easeInOutBack')
            }    
            setTimeout(framein, 500)
 
        })
        $("#close-button").on('click', function(){
            console.log("You clicked the close button")
            $('#checkout-bg').toggleClass("checkout-fadein checkout-fadeout")
            var framein = function(){
                $("#tchopay-iframe").animate({top: "-10%"}, 500, 'easeInOutBack').toggleClass("iframe-fadein iframe-fadeout")
            }    
            setTimeout(framein, 500)
            $('html').remove('<link rel="stylesheet" href="iframe.css" type="text/css" />')
 
        })        



    


});