$(document).ready(function(){


  $('#players').change(function(){
    var name = $('select[name="players"]').val();
    $('#namePlace').html(name);

$('#gameContainer').html('');

  var firebaseUser = firebase.database().ref(name);
  firebaseUser.on('value', function(snapshot){
    $('#gameContainer').html('');
      let userArray = snapshot.val();
      //console.log(userArray);

      $.each(userArray, function(key, value){

       let month = key.substr(4, 2);
       let day = key.substr(6, 2);
       let year = key.substr(0,4);
       let time = key.substr(8, 4);

       let deathCounter = value.deaths;
       let killCounter = value.kills;
       let kdRatio = killCounter/deathCounter;

       let titleRender = '<div class="row"><div class="col-md-12"><h3>Date ';
       let statsRender = '<div class="row"><div class="col-md-6 ">';
       let statsRenderEnd = '</div></div>';
       $('#gameContainer').append(titleRender + month+'/'+day + '/' + year+' '+time+'</h3>');
       $('#gameContainer').append(statsRender+'Kills: '+killCounter+ statsRenderEnd+statsRender+'Deaths: '+deathCounter+statsRenderEnd);
       $('#gameContainer').append(statsRender+'K/D Ratio: '+ killCounter/deathCounter + statsRenderEnd);
          });

        });
    });
});
