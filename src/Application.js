// Filename: Modlah.Application.js
define([
  'jquery',
  'underscore',
  'backbone',

  'routers/ApplicationRouter',
  'models/ApplicationState',
  'views/ApplicationView',

  'patches'
], function($, _, Backbone,
  ApplicationRouter, ApplicationState, ApplicationView ){

  var Application
  ,   _instance = null;

  Application = function() {
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g // {{  }}
    , evaluate : /\{\!(.+?)\!\}/g // {!  !}
    };

    require(['routers/IndexRouter', 'views/IndexView'],
        function( IndexRouter, IndexView ){

      ApplicationRouter.register(IndexRouter, IndexView);

    }.bind(this));

    require(['routers/CoopRouter', 'views/CoopView'],
        function( CoopRouter, CoopView ){

      ApplicationRouter.register(CoopRouter, CoopView);

    }.bind(this));

    this.router = ApplicationRouter.getInstance();
    this.view = new ApplicationView();

    var pushState = false;
    if( window.history.pushState ) {
      pushState = true;
    }

    require([
      'routers/IndexRouter', 'views/IndexView',
      'routers/CoopRouter', 'views/CoopView'
    ], function(){
      Backbone.history.start({
        pushState : pushState
      });
    });

  };

  return {
    getInstance : function() {
      if(_instance === null) {
        _instance = new Application();
      }

      return _instance;
    }
  };
});
