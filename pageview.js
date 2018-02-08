$(document).ready(function(){


  $('#players').change(function(){
    var name = $('select[name="players"]').val();
    $('#namePlace').html(name);

$('#gameContainer').html('');

  var firebaseUser = firebase.database().ref(name);
  firebaseUser.on('value', function(snapshot){
    let userArray = snapshot.val();
    console.log(userArray);

     $.each(userArray, function(key, value){

       let month = key.substr(4, 2);
       let day = key.substr(6, 2);
       let year = key.substr(0,4);
       let time = key.substr(8, 4);

       $('#gameContainer').append('<div class="col-sm-12"><h3>Date '+ month+'/'+day + '/' + year+' '+time+'</h3>');
       let deathCounter = 0;
       let killCounter = 0;

       $.each(value, function(key1, value1){
         if (key1=="kills"){
           killCounter = value1
         } else {
           deathCounter = value1
         }
          $('#gameContainer').append('<div class="col-sm-12">' + value1+" "+ key1+ "</div>");
         });
         $('#gameContainer').append('<div class="col-sm-12">K/D Ratio: '+ killCounter/deathCounter + '</div>');
        });
       });
         });
     });
