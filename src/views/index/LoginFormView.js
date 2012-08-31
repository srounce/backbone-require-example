define([
  'jquery',     
  'underscore', 
  'backbone',
  'views/BasicView'
], function( $, _, Backbone,
  BasicView ){

  var LoginFormView = BasicView.extend({

    tagName:"div",

    className:"LoginFormView "+BasicView.prototype.className,

    events : {
      "submit form"                 : 'EVENT_form_submit'
    },

    render:function(){
      require(['text!templates/index/LoginForm.html'],
          function( loginFormTemplate ) {
        $(this.el).html( _.template(loginFormTemplate) );
      }.bind(this));
    },

    EVENT_form_submit : function( event ) {
      event.preventDefault();
    }

  });

  return LoginFormView;

});