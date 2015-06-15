app.factory('CartFactory', function (LocalStorage, $rootScope){
  return {
    getCart: function (cart) {
      return LocalStorage.get(cart);
    },

    saveCart: function (name, info) {
      LocalStorage.save(name, info);
    },

    clearAllinCart: function () {
      LocalStorage.clearAll();
    }
  };
});