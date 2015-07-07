var AppDispatcher = require('../dispatcher/AppDispatcher');

var ColorActions = {
  loadHistory: function(current, schemes) {
    AppDispatcher.dispatch({
      actionType: 'LOAD_COLORSCHEMES',
      data: {
        current: current,
        schemes: schemes
      }
    });
  },

  addColorScheme: function(color, scheme) {
    console.log('addColorScheme');
    AppDispatcher.dispatch({
      actionType: 'ADD_COLORSCHEME',
      data: {
        color: color,
        scheme: scheme
      }
    });
  },
};

module.exports = ColorActions;