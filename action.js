
function autoScroll() {
    var chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
// reply button functions
const populateInitialNodes = ()=>{

    //send post request to the backend
    fetch("http://localhost:8080/initialNodes", { 
      method: 'post', 
      headers: new Headers({
          //'Authorization': 'Basic '+btoa('username:password'), 
          'Content-Type': 'application/json'
      }), 
      body:JSON.stringify(
        {
          "projectId": Id
          })

    }).then(response => {
        // Check the HTTP status code
        if (!response.ok) {
            throw new Error( response.status + ' ' + response.statusText);
        }
    
        // Process the successful response
        return response.json();
    })
    .then((data)=>{

        //console.log(data)
        data.data.map((data)=>{
            const reply_id = data.connected_reply_id[0]
            $("#action-list").append(`<p class="action" onclick='reply("${reply_id}", "${data.node.data.name}")'><span>` + data.node.data.name + "</span></p>");

            
        })
    }).catch((error) => {
        console.error('Error:', error);
        alert("Failed to load .");
    });
};   
   
const reply = (replyId, name) => {
    // Display loading dots animation
    let botTypingIndicator = '<p class="botTyping"><span></span><span></span><span></span></p>';
    $("#chatbox").append(botTypingIndicator);

    setTimeout(() => {
        // Remove typing indicator after delay
        $(".botTyping").remove();

        fetch("http://localhost:8080/reply", {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "projectId": Id,
                "replyId": replyId
            })
        }).then(response => {
            // Check the HTTP status code
            if (!response.ok) {
                throw new Error( response.status + ' ' + response.statusText);
            }
        
            // Process the successful response
            return response.json();
        })
        .then((data) => {
            // Process the response data
            data.data.map((data) => {
                let userText = '<p class="userText"><span>' + name + "</span></p>";
                $("#chatbox").append(userText);
                $("#chatbox").append('<p class="botText"><span>' + data.node.data.message + "</span></p>");

                data.connected_button.map((button) => {
                    const button_id = button.id
                    const button_name = button.data.name

                    data.button_edge_target.map((target) => {
                        if (button_id === target.button_id) {
                            $("#chatbox").append(`<p class="action" onclick='reply("${target.edge_target}","${button_name}")'><span>` + button_name + "</span></p>");
                        }
                    })
                })
            })
            autoScroll()
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Failed to send reply.");
        });
    }, 1000); // Adjust the delay duration (in milliseconds) as needed
}



    //do get data from database
    /*replyDummyData.map((action)=>{

        console.log(action.Id)
        let actionId = action.Id;

        if(actionId === Id){
            let userText = '<p class="userText"><span>' + action.actionName + "</span></p>";
            $("#chatbox").append(userText);

            $("#chatbox").append('<p class="botText"><span>' + action.reply + "</span></p>");

            action.nextActionChoices.map(( nextAction)=>{

                $("#chatbox").append(nextAction);
                //$("#action-list").append('<div class = "action">just got appended </div>')
 
            })
            
        }
    })

    //let botText = '<p class="botText"><span>' + response + "</span></p>";
    //let nextActionChooices = '<div class = "action"> Book a call </div>'
    //$("#chatbox").append(botText);
    //$("#chatbox").append(nextActionChooices);

}

// action button functions
const emailActionBtn = ()=>{

    document.getElementById("form-container").style.display = "block";
}


// reply dummy data 
const buttonData = [
   {
        name:"services",
        Id: "123",
        reply_id : "123replyid" 
    },
] */ 