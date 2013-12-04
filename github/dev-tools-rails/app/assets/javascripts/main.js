var startupInstitute = {

  /* Helper function for grabbing the input DOM node, it's name and it's value */
  parseInputData: function(inputs, callback) {
    $.each(inputs, function(index, input) {
            var input = $(input);
            var inputName = input.prop('name');
            var inputValue = input.val();
            callback(input, inputName, inputValue);
    });
  },

  /* Grab all the form data & prepare it for submission */
  gatherFormData: function() {
      var self = this; // save a reference to our 'this' context so we can access the parseInputData helper method (otherwise we will have scoping problems )
      var formData = {}; // setup an empty object that we can fill with form values to submit
      var inputs = $('#order-form div.field > input'); // use jQuery find to select all the inputs in the form


      self.parseInputData(inputs, function(input, itemBeingPurchased, quantity) {
        formData[itemBeingPurchased] = {};

        /* handle processing of the styles we want to order for items that require it */
        if (input.data('multiple-styles')) {
          var styleInputs = input.siblings('div.style-info').find('input');
          self.parseInputData(styleInputs, function(input, color, quantity) {
            for (var i = 0; i < quantity; i++) {
              formData[itemBeingPurchased][color] = quantity
            }
          });
        }
        else {
          formData[itemBeingPurchased] = quantity;
        }
      });

      return formData; // return our form data for submission
  }
};


/* Add a click handler event to submit the form data */
$('#submit').click(function(e){
    e.preventDefault();
    var formData = startupInstitute.gatherFormData(); // save our form data to a variable that we can send in our ajax POST

    /* submit the form! */
    $.ajax({
      type: 'POST',
      data: JSON.stringify(formData),
      contentType: 'application/json',
        url: 'http://localhost:3000/submit-order',
        success: function(data) {
            console.log('success: ', JSON.stringify(data));
            $('#order-form').html("<h3>Thank you for your order!</h3>");
        },
        error: function(err) {
          console.log('error: ', err);
        }
    }); // end ajax
}); // end click event handler
