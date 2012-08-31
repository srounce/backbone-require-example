define([
  'jquery',
  'underscore',
  'backbone',

  'views/BasicView',
  'models/ApplicationState'
], function($, _, Backbone,
  BasicView, ApplicationState ){
  
  var CoopView,
      appState = ApplicationState.getInstance();

  CoopView = BasicView.extend({
    className : BasicView.prototype.className,

    initialize: function() {
      BasicView.prototype.initialize.call(this);

      appState.bind('change:CoopViewState', this.updateView, this);
    },
    
    layout: function() {
      
    },

    updateView : function() {
      console.log('Updating CoopView to new state:'+appState.get('CoopViewState'));
    },
    
    render: function() {

      require(['text!templates/coop/CoopContainer.html'],
          function( coopContainer ) {
        $(this.el).html( $('<div class="ColumnPanel"></div>').append( _.template(coopContainer) ) );
      }.bind(this));
      
    }
    
    
  });

  return CoopView;

});