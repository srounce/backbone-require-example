define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var ApplicationState
  ,   _instance = null

  ApplicationState = Backbone.Model.extend({

    initialize : function() {
      this.params = {};
    },
    // (de)serialization functions
    deserialize: function(key, value) {
      var params = this.params,
        f = params[key] && params[key].deserialize || _.identity;
      return f(value);
    },
    serialize: function(key, value) {
      var params = this.params,
        f = params[key] && params[key].serialize || _.identity;
      return f(value);
    },
    // convenience function to set a serialized value
    setSerialized: function(key, value) {
      o = {};
      o[key] = this.deserialize(key, value);
      this.set(o);
    },

    // add de/serializable state parameters
    addParam: function(key, deserialize, serialize) {
        this.params[key] = {
            deserialize: deserialize || _.identity,
            serialize: serialize || _.identity
        }
    }

  });

  return {
    getInstance : function( ) {
      if( _instance === null ) {
        _instance = new ApplicationState();
      }

      return _instance;
    }
  };
  
});