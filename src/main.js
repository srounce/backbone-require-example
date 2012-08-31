// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: '../lib/jquery/jquery-min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-optamd3-min',
    text: '../lib/require/text',
    templates: '../templates'
  }

});

require([
  // Load our app module and pass it to our definition function
  'Application'

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
], function(Application){

  // The "Application" dependency is passed in as "Application"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  var app = Application.getInstance();

});
