const header = document.getElementById("headerContainer")
const botText = document.getElementById("botTextContainer")
const userInput = document.getElementById("userInputContainer")



  header.innerHTML = '<div id="header"><div id="botName">Ernest</div></div>'
  header.append = '<div> close</div>'
  botText.innerHTML = '<div id="chatbox"><p class="botText"><span>Hi! Im Ernest</span></p><p class="botText"><span>You can ask me Questions</span></p><p class="botText"><span>Type "quit" to close</span></p></div>'
  userInput.innerHTML = '<div id="userInput"><input id="textInput" type="text" name="msg" placeholder="Type here..." /><div id="sendButton"> &#128077; </div></div>'

function display() {
  document.getElementById("boxed").style.display = "block";
  document.getElementById("chatWithUsContainer").style.display = "none";

}
function close(){

  document.getElementById("boxed").style.display = "none";
  document.getElementById("chatWithUsContainer").style.display = "block";
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
      body:JSON.stringify({'msg': rawText})

    }).then((resp) => resp.json())
      .then((data) => {

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