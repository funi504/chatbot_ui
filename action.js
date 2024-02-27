
let rawText = "services";
let response = " this is some made up response about our services"
const populate = ()=>{
    
    $("#action-list").append('<div class = "action">just got appended </div>')
}
// reply button functions
const reply = (Id)=>{

    //do get data from database
    replyDummyData.map((action)=>{

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
]