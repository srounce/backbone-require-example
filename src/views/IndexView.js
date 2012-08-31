define([
  'jquery',
  'underscore',
  'backbone',

  'models/ApplicationState',
  'views/BasicView'
], function($, _, Backbone,
  ApplicationState, BasicView ){
  
  var IndexView,
      appState = ApplicationState.getInstance();

  IndexView = BasicView.extend({
    className : 'IndexView ',

    initialize: function() {
      BasicView.prototype.initialize.call(this);
    },
    
    layout: function() {
      
    },
    
    render: function() {
      
      require(['views/index/WelcomePanelView'],
          function( WelcomePanelView ) {

        this.welcomePanel = new WelcomePanelView();
        $(this.el).html( this.welcomePanel.el );
        this.welcomePanel.create();

      }.bind(this));

    }
    
    
  });

  return IndexView;

});