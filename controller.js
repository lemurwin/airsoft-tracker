
//boilerplate jquery
$(document).ready(function(){
  //Render title page
  $('#players').change(function(){
    var name = $('select[name="players"]').val();
    $('#namePlace').html(name);
  });


  //building a timestamp function to reference objects by date
  const timestamp = function(){
    const today= new Date();
    let y = today.getFullYear();
    let mm = today.getMonth()+1;
    let d = today.getDate();
    let h = today.getHours();
    let m = today.getMinutes();
    if (mm<10){
        mm = "0"+mm;
      }

      if (d<10){
        d='0'+d;
      }
      if (m<10){
        m='0'+m;
      }
      if (h<10){
        h='0'+h;
      }
    return y+''+mm+''+d+''+h+''+m;
  };


  //what kind of data we want to store for a user
  let userData = {
    kills: 0,
    deaths: 0,
    location: 0,
    record: 0,
  };

  //Adding information to userdata
  $('#killsCounter').html(userData.kills);
  $('#deathsCounter').html(userData.deaths);

  $('#kills').click(function(){
    userData.kills = userData.kills+1;
    $('#killsCounter').html(userData.kills);
  });

  $('#deaths').click(function(){
    userData.deaths = userData.deaths+1;
    $('#deathsCounter').html(userData.deaths);
  });

  //added a reset button
  $('#reset').click(function(){
    userData.kills=0;
    userData.deaths=0;
    $('#killsCounter').html(userData.kills);
    $('#deathsCounter').html(userData.deaths);
  })

  //submitting to Firebase
  $('#submit').click(function(){
    var firebaseRef = firebase.database().ref();

      let currentTime= timestamp();
      let user = $('select[name="players"]').val();
      let location = $('input[name="location"]').val();
      let record = $('input[name="record"]:checked').val();

      userData.record = record;
      userData.location = location;

      //Throwing errors to prompt users to fix data
      if (record == undefined){
        alert('Enter win record!');
      }
      if (user != "Choose a Name"){
        firebaseRef.child(user).child(currentTime).set(userData);
        console.log(userData);}
      else {
        alert("Choose a player");
      }

      alert('Submission Complete');
    });
  });
