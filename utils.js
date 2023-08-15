const boxed = document.getElementById("boxed")
boxed.innerHTML =
` <div id=headerContainer></div>
  <div id='form-container'>
    <h4 onclick=closeForm() id='close-button'>close</h4>
    <form id='email-form' >
      <input type='text' placeholder='Enter your name' id='name-input' name='name'></input>
      <input type='text' placeholder='Enter your email' id='email-input' name='email'></input>
      <textarea type='text' placeholder='Enter your message' id='message-input' name="message" rows="8"></textarea>
      <input type='submit' id='form-submit-button'></input>
  </form>
  </div>
  <div id="chatboxContainer" >
    <div id= "botTextContainer"></div>
    <div id= "userInputContainer"></div>
  </div>`


const header = document.getElementById("headerContainer")
const botText = document.getElementById("botTextContainer")
const userInput = document.getElementById("userInputContainer")

  header.innerHTML = 

  `<div id="header">
    <div id="sendEmail" onClick=displayForm() >
      <img src="img2.png" class="img"/>
    </div>
    <a id="sendWhatsapp" href="https://wa.me/${cellphoneNumbers}" >
      <img src="img.png" class="img"/>
    </a>
  </div>`

  header.append = '<div> close</div>'

  botText.innerHTML = 
  `<div id="chatbox">
    <p class="botText"><span>Hi! Im Ernest</span></p>
    <p class="botText"><span>You can ask me Questions</span></p>
    <p class="botText"><span>Type "quit" to close</span></p>
  </div>`

  userInput.innerHTML = 
  `<div id="userInput">
    <input id="textInput" type="text" name="msg" placeholder="Type here..." />
    <div id="sendButton"> &#128077; </div>
  </div>`

function display() {
  document.getElementById("boxed").style.display = "block";
  document.getElementById("chatWithUsContainer").style.display = "none";

}
function close(){

  document.getElementById("boxed").style.display = "none";
  document.getElementById("chatWithUsContainer").style.display = "block";
}

function displayForm() {
  document.getElementById("form-container").style.display = "block";

}
function closeForm(){

  document.getElementById("form-container").style.display = "none";

}

  function getBotResponse() {
    var rawText = $("#textInput").val();
    var userHtml = '<p class="userText"><span>' + rawText + "</span></p>";
  
    if (rawText == "quit"){
      close()
    }

    $("#textInput").val("");

    if(rawText !== ""){
    $("#chatbox").append(userHtml);
    document
      .getElementById("userInput")
      .scrollIntoView({ block: "start", behavior: "smooth" });

    //send post request to the backend
    fetch("http://127.0.0.1:5000/success", { 
      method: 'post', 
      headers: new Headers({
          //'Authorization': 'Basic '+btoa('username:password'), 
          'Content-Type': 'application/json'
      }), 
      body:JSON.stringify(
        { 'msg': rawText,
          "project_Id": Id
          })

    }).then((resp) => resp.json())
      .then((data) => {

            //console.log(Id)
            var botHtml = '<p class="botText"><span>' + data.response + "</span></p>";
          $("#chatbox").append(botHtml);

          document
            .getElementById("userInput")
            .scrollIntoView({ block: "start", behavior: "smooth" });
      })
    };
   
  }

  $("#textInput").keypress(function(e) {
    if (e.which == 13) {
      getBotResponse();
    }
  });

  $("#sendButton").click(function(){
  getBotResponse();
          });




  // Get a reference to the form element
  var form = document.getElementById('email-form');

  // Add a submit event listener to the form
  form.addEventListener('submit', function(event) {
      // Prevent the default form submission
      event.preventDefault();


      // Construct the dynamic action URL
      var dynamicAction = 'https:/myurl.com/'+ Id;

      var nameValue = document.getElementById('name-input').value;
      var emailValue = document.getElementById('email-input').value;
      var messageValue = document.getElementById('message-input').value;

      // Display the form values
      console.log('Name: ' + nameValue);
      console.log('Email: ' + emailValue);
      console.log('message: ' + messageValue);

      console.log(dynamicAction)
      
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {

          alert('Invalid email address');
          return;
            }
  
      if( nameValue!=='' && emailValue!=='' && messageValue!==''){

      fetch(dynamicAction, { 
        method: 'post', 
        headers: new Headers({
            //'Authorization': 'Basic '+btoa('username:password'), 
            'Content-Type': 'application/json'
        }), 
        body:JSON.stringify(
          { 'name': nameValue,
            "email": emailValue,
            "message":messageValue,
            "project_Id": Id
            })
  
      }).then(response => response.json())
      .then(data => {
        // Handle the response after posting data
        console.log(data);
        alert("email sent")
      })
      .catch(error => {
        // Handle any errors
        console.error('Error posting data:', error);
        alert("failed to send")
      });

      }else {

        alert("missing some value")
      }
  });
          
          