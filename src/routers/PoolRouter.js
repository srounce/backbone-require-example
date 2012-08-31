define([
  'jquery',
  'underscore',
  'backbone',

  'routers/BasicRouter',
  'models/ApplicationState',

  'views/IndexView',
  'views/RegistrationView'
], function($, _, Backbone,
  BasicRouter, ApplicationState, 
  IndexView, RegistrationView){

  var CoopRouter
  ,   appState = ApplicationState.getInstance();

  CoopRouter = BasicRouter.extend({
    
    routes : {
      "" : "index"
    , "register" : "register"
    },

    index : function() {

      appState.setSerialized('bookid', 2);

      appState.set({ topview: IndexView });

    },

    register : function() {
      appState.set({ topview: RegistrationView });
    },

    getRoute : function() {
      return 'index';
    }

  });

  return CoopRouter;

});