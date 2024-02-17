
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

const whatsappActionBtn = ()=>{
    
}

// reply dummy data 
const replyDummyData = [
   {
        actionName:"services",
        Id: "123",
        reply:" this is some made up response about our services",
        nextActionChoices: [`<div class = "action" onclick="reply('1234')"> call </div>`, 
                            `<div class = "action"> prices </div>`]
    },
    {
        actionName:"Talk to a Human",
        Id :"1234",
        reply:" click below to chose between whatsapp or email",
        nextActionChoices: [`<div class = "action" onclick ="window.open('https://wa.me/${cellphoneNumbers}')" > whatsapp </div>`, 
                            `<div class = "action" onclick='emailActionBtn()'> send email </div>`]
    }
]