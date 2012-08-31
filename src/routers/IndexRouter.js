define([
  'jquery',
  'underscore',
  'backbone',

  'routers/BasicRouter',
  'models/ApplicationState',
  'routers/ApplicationRouter',  
], function($, _, Backbone,
  BasicRouter, ApplicationState, ApplicationRouter){

  var IndexRouter
  ,   appState = ApplicationState.getInstance();

  IndexRouter = BasicRouter.extend({
    
    routes : {
      ""          : "index"
    , "login"     : "login"
    , "register"  : "register"
    },

    index : function() {

      require(['views/IndexView'], function(
        IndexView ){

        ApplicationRouter.register(IndexRouter, IndexView);
        appState.set({ topview: IndexView });

      })

    },

    register : function() {

      require(['views/RegistrationView'], function(
          RegistrationView ){

        ApplicationRouter.register(IndexRouter, RegistrationView);
        appState.set({ topview: RegistrationView });

      });
    },

    login : function() {

      require(['views/LoginView'], function(
          LoginView ){

        ApplicationRouter.register(IndexRouter, LoginView);
        appState.set({ topview: LoginView });

      });
    },

    getRoute : function() {
      return 'index';
    }

  });

  return IndexRouter;

});