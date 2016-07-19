// Для INPUT:FILE
$(function() {
  $(document).on('change', ':file', function() {
    var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });
  $(document).ready(function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
      console.log(numFiles);
      console.log(label);
      var input = $(this).parents('.grp-file').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;
      if (input.length) { input.val(log); }
      else              { if (log) alert(log); }
    });
  });
});

// Для DATA PICKER
$(function() {$("#datepicker").datepicker();});
