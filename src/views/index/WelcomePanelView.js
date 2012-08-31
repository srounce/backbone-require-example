define([
  'jquery',     
  'underscore', 
  'backbone',
  'views/BasicView'
], function( $, _, Backbone,
  BasicView ){

  var WelcomePanelView = BasicView.extend({

    tagName:"div",

    className:"ColumnPanel "+BasicView.prototype.className,

    events:{
      "keyup #quickGroupSearchInput":"EVENT_quickGroupSearchInput_keyup"
    },

    render:function(){
      
      require(['text!templates/home/WelcomePanelView.html'],
          function( welcomePanelTemplate ) {
        $(this.el).html( _.template(welcomePanelTemplate) );
      }.bind(this));

    },

    EVENT_quickGroupSearchInput_keyup:function(event){
      try {
        if( event.currentTarget.value != this.searchTerm &&
          event.currentTarget.value.length > 4 ) {
          this.searchTerm = event.currentTarget.value;

          // Do searchy bit
        }
      } catch(e) {
        this.searchTerm = "";
      }
    }

  });

  return WelcomePanelView;

});