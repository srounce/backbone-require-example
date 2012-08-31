define([
  'jquery',     
  'underscore', 
  'backbone',

  'models/ApplicationState'
], function( $, _, Backbone,
  ApplicationState ){

  var BasicRouter
  ,   appState = ApplicationState.getInstance();

  BasicRouter = Backbone.Router.extend({

    // navigate to the current route
    getRoute : function() {
      return '';
    },

    // update the url based on the current state
    updateRoute : function() {
      var route = this.getRoute();

      if (window._gaq) {
          _gaq.push(['_trackPageview', location.pathname + '#' + route]);
      }
      this.navigate(route);
    },

    // update the url if this router's view is the top view
    updateViewRoute: function() {
      if (this.topview && this.topview == appState.get('topview')) {
        this.updateRoute();
      }
    }
    
  });

  return BasicRouter;

});