app.factory('LocalStorage', function ($rootScope){
  return {
    get: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },

    save: function (key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    
    clearAll: function () {
      localStorage.clear();
    }
  };
});