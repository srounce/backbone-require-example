define([
  'jquery',
  'underscore',
  'backbone',

  'views/BasicView',
], function($, _, Backbone,
  BasicView ){
  
  var RegistrationView;

  RegistrationView = BasicView.extend({
    className : 'ColumnPanel '+BasicView.prototype.className,

    initialize: function() {
      BasicView.prototype.initialize.call(this);
    },
    
    layout: function() {
      
    },
    
    render: function() {

      require(['views/index/RegistrationFormView'],
          function( RegistrationFormView ) {

        this.registrationForm = new RegistrationFormView();
        $(this.el).html( this.registrationForm.el );
        this.registrationForm.create();

      }.bind(this));

    },
    
    
  });

  return RegistrationView;

});