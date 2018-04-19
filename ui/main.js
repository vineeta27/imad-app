//button
 var submit=document.getElementById('submit_btn')
 submit.onclick = function(){
       var request= new XMLHttpRequest();
          //
          request.onreadystatechange= function(){
             if(request.readyState===XMLHttpRequest.DONE)
             {
                 if(request.status===200)
                 {
                     alert('Logged in succesfully');  
                 }
                 else if(request.status===403){
                     alert('Username/password incorrect');
                 }
                 else if(request.status===500){
                  alert('Something went wrong on server');   
                 }
             }
          };
          var username=document.getElementById('username');
          var password=document.getElementById('pass');
          var name = nameInput.value;
         
         request.open('POST','http://vineetasuthar2000.imad.hasura-app.io/login',true);
         request.setRequestHeader('Content-Type', 'application/json');
         request.send(JSON.stringify({username: username, password: password}));
     
 };