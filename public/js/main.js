//client-side js
  $("#lookup").on("click", function(event) {
    event.preventDefault();
    var login = {
      ID: $("#ID").val().trim(),
      pass: $("#pass").val().trim(),
    };

    $.get("/query/", login)
    .done(function(data) {
      $('#welcome').html("welcome "+data[0].fname);
    });
  });

    $("#lookup2").on("click", function(event) {
      event.preventDefault();
      var login = {
        ID: $("#ID").val().trim(),
        pass: $("#pass").val().trim(),
      };

      $.get("/query2/", login)
      .done(function(data) {
        $('#welcome').html("welcome "+data[0].fname);
      });
    });
