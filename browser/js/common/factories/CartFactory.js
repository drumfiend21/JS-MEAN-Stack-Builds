
app.factory('CartFactory', function ($rootScope){
  return {
    get: function ('cart') {
      return JSON.parse(localStorage.getItem('cart'));
    },

    save: function ('cart', cart) {
      localStorage.setItem(cart, JSON.stringify(cart));
    },

    remove: function (key) {
      localStorage.removeItem(key);
    },

    clearAll: function () {
      localStorage.clear();
    }
  };
});