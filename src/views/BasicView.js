define([
  'jquery',
  'underscore',
  'backbone',
  'routers/ApplicationRouter',
  'models/ApplicationState'
], function($, _, Backbone, 
  ApplicationRouter, ApplicationState ){
  
  var appState = ApplicationState.getInstance()
  ,   BasicView;

  BasicView = Backbone.View.extend({
    cssStates : {
      hidden : 'hidden'
    },

    className: 'BasicView',

    timings : {
      open  : 150
    , close : 150
    },

    events : {
      'click a[href^=/#/]' : 'EVENT_navigateDefault_click'
    },

    initialize : function() {
      this.parent = this.options.parent || null;
      
      this.$el = $(this.el);
      this.$el.addClass(this.cssStates.hidden);
    },

    open : function( callback ) {
      $(this.el).removeClass(this.cssStates.hidden);
      if( callback ) {
        setTimeout(function(){
          callback();
        }.bind(this), this.timings.open);
      }
    },

    close : function( callback ) {
      $(this.el).addClass(this.cssStates.hidden);
      if( callback ) {
        setTimeout(function(){
          callback();
        }.bind(this), this.timings.close);
      }
    },

    layout : function() {

    },

    create : function() {
      this.render();
      this.layout();
      setTimeout(function(){
        this.open();
      }.bind(this), 0)
    },

    destroy : function( callback, graceful ) {
      var view = this;

      this.unbindEvents();

      if( graceful !== false ) {
        this.close(function(){
          view.remove();
          if( callback ) callback();
        });
      } else {
        this.$el.addClass(this.cssStates.hidden);
        this.remove();
      }
    },
    unbindEvents: function() {
      var view = this,
        eventSplitter = /^(\S+)\s*(.*)$/,
        events = view.events || [];

      _(events).each(function(e, key) {
          var match = key.match(eventSplitter),
            eventName = match[1], 
            selector = match[2];
          view.$el.undelegate(selector, eventName);
      });
    },
    // bind/unbind state listeners
    bindState: function(event, handler, context) {
        // create handler array if necessary
        if (!this._stateHandlers) {
            this._stateHandlers = [];
        }
        appState.bind(event, handler, context);
        this._stateHandlers.push({ event: event, handler: handler });
    },
    unbindState: function() {
      (this._stateHandlers || []).forEach(function(h) {
        state.unbind(h.event, h.handler);
      });
    },

    EVENT_navigateDefault_click : function( event ) {
      var route = this.$(event.target).attr('href').substr(3);
      
      event.target['clickCount'] = event.target['clickCount'] + 1 || 0;
      
console.log('Navigating to route: "/'+route+'" - times clicked:'+event.target['clickCount']);
      ApplicationRouter.getInstance().navigate(route, {trigger:true});

      event.preventDefault();
    }

  });

  return BasicView;

});