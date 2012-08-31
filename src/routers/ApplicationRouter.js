define([
  'jquery',
  'underscore',
  'backbone',
  'routers/BasicRouter',
  'models/ApplicationState'
], function( $, _, Backbone, BasicRouter, ApplicationState ){

  var ApplicationRouter
  ,   appState = ApplicationState.getInstance()
  ,   routers = new Array()
  ,   _instance = null;

  ApplicationRouter = BasicRouter.extend({
    
    initialize : function() {
      var router = this;

      _(routers).each(function(r, key, list) {
        r.router = new r.clarse();
      });
    },
    getRouter : function() {
      var topview = appState.get('topview');

      try {
        return _(routers).detect(function(r) {
            return r.view == topview;
        }).router;
      } catch (e) {
        console.error('top view not found');
      }
    },

    getRoute: function() {
      // delegate
      return this.getRouter().getRoute();
    },
    
    navigate: function(route, trigger) {
      // delegate
      return this.getRouter().navigate(route, trigger);
    }

  });

  return {
    getInstance : function() {
      if(_instance === null) {
        _instance = new ApplicationRouter();
      }

      return _instance;
    },
    register : function(router, view) {
      var BoundRouter = {
        view : view
      , clarse: router
      };

      if( _instance !== null ) {
        BoundRouter.router = new BoundRouter.clarse();
      }
      routers.push(BoundRouter);
    }
  };
});