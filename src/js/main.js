const urlParams = new URLSearchParams(window.location.search);
async function Main(){
  RedirectByPressingEscape()
  var userData = await FetchUserData()
  MessageInput(userData.token)
  if(userData == null || userData == undefined) console.log(await userData)
  document.querySelector(".title-bvn").innerHTML = "Bonjour " + userData.FirstName + "<br> Cours #1 - Introduction"

}

var Redirect = () => {
  document.location.href="./../index.html";
}

var RedirectByPressingEscape = () => {
  document.addEventListener('keydown', (event) => {
    if(event.key == "Escape") Redirect()
  })
}

var MessageInput = (userToken) => {
  document.addEventListener('keydown', (event) => {
    if(event.key == "Control") sendMessage(userToken)
  })
}

var FetchUserData = () => {
  return new Promise((resolve, reject) => {
    if(urlParams.has('identifiant')){ // Fetch user data from API
      if(urlParams.get('identifiant') == "") Redirect()
      var id = urlParams.get('identifiant')

      fetch("http://localhost:8080/api/auth/" + id,
        {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
      }).then(function(res){ 
          res.json().then(user => {
            if(user.error) Redirect()
            else resolve(user)
          }) 
        })
        .catch(() => Redirect())
    } else Redirect()
  })
}

var sendMessage = (userToken) => {
  var message = document.querySelector(".textarea-message").value.replace(/\|&;\$%@"<>\(\)\+,/g, "");
  fetch(`http://localhost:8080/api/messages/${userToken}/${message}`)
  .then(res => res.json().then(data => {
    if(data.error) document.querySelector(".message-callback").innerHTML = `<div class="frame"><button class="custom-btn btn-15">Error</button></div>`
    else document.querySelector(".message-callback").innerHTML = `<div class="frame"><button class="custom-btn btn-15">Sent</button></div>`
  }))
  .catch(() => document.querySelector(".message-callback").innerHTML = `<div class="frame"><button class="custom-btn btn-15">Error</button></div>`)
}
Main()