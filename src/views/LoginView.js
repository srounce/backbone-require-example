define([
  'jquery',
  'underscore',
  'backbone',

  'views/BasicView',
], function($, _, Backbone,
  BasicView ){
  
  var LoginView;

  LoginView = BasicView.extend({
    className : 'ColumnPanel '+BasicView.prototype.className,

    initialize: function() {
      BasicView.prototype.initialize.call(this);
    },
    
    layout: function() {
      
    },
    
    render: function() {

      require(['views/index/LoginFormView'],
          function( LoginFormView ) {

        this.loginForm = new LoginFormView();
        $(this.el).html( this.loginForm.el );
        this.loginForm.create();

      }.bind(this));

    },
    
    
  });

  return LoginView;

});