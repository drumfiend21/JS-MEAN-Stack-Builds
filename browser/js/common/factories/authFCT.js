app.factory('authFCT', function ($http) {

    var postSignUpForm = function (signupInfo){
       return $http.post('/api/register/', {signupInfo : signupInfo}, function (response) {
            console.log('response from signup route', response);
            return response.data; 
       });
    }

    return {
        postSignUpForm: postSignUpForm,
    };

});
