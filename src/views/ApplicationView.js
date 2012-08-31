define([
  'jquery',
  'underscore',
  'backbone',
  'views/BasicView',
  'models/ApplicationState'
], function($, _, Backbone, 
  BasicView, ApplicationState ) {

  var ApplicationView
  ,   appState = ApplicationState.getInstance()
  ,   viewCache = [];

  ApplicationView = BasicView.extend({
    
    el: '#ApplicationContentArea',

    initialize : function() {
      var hiddenState = this.cssStates.hidden;
      this.cssStates.hidden = '';

      BasicView.prototype.initialize.call(this);

      this.cssStates.hidden = hiddenState;

      appState.bind('change:topview', this.updateView, this);
    },
    
    cached: function(clarse) {
      var cached = _(viewCache).detect(function(c) {
        return c.view == clarse;
      });
      // if no key has been set, this has not been cached
      if (!cached) {
        // instantiate and cache
        cached = {
          view: clarse,
          instance: new clarse({ parent: this })
        };
        viewCache.push(cached);
      } 
      return cached.instance;
    },
    
    // update the top-level view
    updateView: function() {
      var clarse = appState.get('topview')
      ,   view = this.cached(clarse);

      this.open(view, clarse);
    },
    
    // close the current view and open a new one
    open: function(view, clarse) {
      if (view) {
        var oldview = this.currentView;

        if (oldview && oldview != view) {
          // get the old view clarse
          oldclarse = _(viewCache).detect(function(c) {
            return c.instance == oldview;
          }).view;

          oldview.destroy(function() {
            this.currentView = view;
            this.$el.html(view.el);
            view.create();
          }.bind(this));
        } else if(!oldview) {
          this.currentView = view;
          this.$el.html(view.el);
          view.create();

          console.log('don\'t got no oldview');
        }
      }
    }

  });

  return ApplicationView;

});