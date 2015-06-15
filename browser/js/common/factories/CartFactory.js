app.factory('CartFactory', function ($rootScope){
  return {
    getItem: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },

    deleteItem: function (key) {
      localStorage.removeItem(key);
    },

    // editItem: function (quantity) {
    //   // localStorage.
    // },

    getCart: function(){
      var archive = [],
          keys = Object.keys(localStorage)
      for (var i = 0; i < keys.length; i++) {
        archive.push(localStorage.getItem(keys[i]));
      }
      return archive;
    },

    saveCart: function (name, info) {
      localStorage.setItem(name, JSON.stringify(info));
    },

    clearAllinCart: function () {
      localStorage.clear();
    }
  };
})
