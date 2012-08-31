define([
  'jquery',
  'underscore',
  'backbone',

  'routers/BasicRouter',
  'models/ApplicationState',
  'routers/ApplicationRouter' 
], function($, _, Backbone,
  BasicRouter, ApplicationState, ApplicationRouter){

  var CoopRouter
  ,   appState = ApplicationState.getInstance();

  CoopRouter = BasicRouter.extend({
    
    routes : {
      "browse"          : "fullList"
    , "browse/:id"      : "viewCoop"
    , "create"          : "edit"
    , "browse/:id/edit" : "edit"
    },

    fullList : function() {
      require(['views/CoopView'], function(
        CoopView ){

        ApplicationRouter.register(CoopRouter, CoopView);
        appState.set({ topview: CoopView });
        appState.set({ CoopViewState: 'list' });

      });
    },

    viewCoop : function( id ) {
      require(['views/CoopView'], function(
        CoopView ){

        ApplicationRouter.register(CoopRouter, CoopView);
        appState.set({ topview: CoopView });
        appState.set({ CoopViewState: 'view' });

      });
    },

    edit : function( id ) {

      require(['views/CoopView'], function(
        CoopView ){

        ApplicationRouter.register(CoopRouter, CoopView);
        appState.set({ topview: CoopView });
        appState.set({ CoopViewState: 'edit' });

      });

    },

    getRoute : function() {
      return 'coop';
    }

  });

  return CoopRouter;

});