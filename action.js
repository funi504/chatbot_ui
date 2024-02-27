
const actionList = document.getElementById("action-list")

const populate = ()=>{
    
    $("#action-list").append('<div class = "action">just got appended </div>')
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

    }).then((resp) => resp.json())
    .then((data)=>{

        console.log(data)
        data.data.map((data)=>{
            const reply_id = data.connected_reply_id[0]
            $("#action-list").append(`<p class="action" onclick= reply("${reply_id}")><span>` + data.node.data.name + "</span></p>");
            
        })
    })
};   
   
const reply = (replyId)=>{

    fetch("http://localhost:8080/reply", { 
        method: 'post', 
        headers: new Headers({
            //'Authorization': 'Basic '+btoa('username:password'), 
            'Content-Type': 'application/json'
        }), 
        body:JSON.stringify(
          {
            "projectId": Id,
            "replyId": replyId
            })
  
      }).then((resp) => resp.json())
      .then((data)=>{
  
          console.log(data)
          data.data.map((data)=>{
              //const reply_id = data.connected_reply_id[0]
              $("#chatbox").append('<p class="botText"><span>' + data.node.data.message + "</span></p>");

              data.connected_button.map((button)=>{
                  const button_id = button.id
                  const button_name = button.data.name
                  data.button_edge_target.map((target)=>{

                    if(button_id === target.button_id){
                        $("#chatbox").append(`<p class="action" onclick= reply("${target.edge_target}")><span>` + button_name + "</span></p>");
                    }
                  })
              


              })
          })
      })
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