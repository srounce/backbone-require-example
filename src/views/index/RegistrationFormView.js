define([
  'jquery',     
  'underscore', 
  'backbone',
  'views/BasicView'
], function( $, _, Backbone,
  BasicView ){

  var RegistrationFormView = BasicView.extend({

    tagName:"div",

    className:"RegistrationFormView "+BasicView.prototype.className,

    events : {
      "input input[name^=email]"    : 'EVENT_matchEmailAddresses_input',
      "input input[name^=password]" : 'EVENT_matchPasswords_input',
      "submit form"                 : 'EVENT_form_submit'
    },

    render:function(){
      require(['text!templates/index/RegistrationForm.html'],
          function( registrationFormTemplate ) {
        $(this.el).html( _.template(registrationFormTemplate) );
      }.bind(this));
    },

    EVENT_matchEmailAddresses_input : function( event ) {

      if( this.$('#email').val() !== this.$('#email_repeat').val() ) {
        event.currentTarget.setCustomValidity('E-mail addresses must match.');
      } else {
        this.$('#email').get(0).setCustomValidity('');
        this.$('#email_repeat').get(0).setCustomValidity('');
      }
      
    },

    EVENT_matchPasswords_input : function( event ) {
      var re = /^(.*){8}$/;

      if( !re.test(this.$('#password').val()) ) {
        this.$('#password').get(0).setCustomValidity('Password must be longer than 8 characters valid');
      } else if( !re.test(this.$('#password').val()) ) {
        this.$('#password_repeat').get(0).setCustomValidity('Password must be longer than 8 characters valid');
      } else if( this.$('#password').val() !== this.$('#password_repeat').val() ) {
        event.currentTarget.setCustomValidity('Passwords must match.');
      } else {
        this.$('#password').get(0).setCustomValidity('');
        this.$('#password_repeat').get(0).setCustomValidity('');
      }
    },

    EVENT_form_submit : function( event ) {
      event.preventDefault();
    }

  });

  return RegistrationFormView;

});