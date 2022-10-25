const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('identifiant')){
    if(urlParams.get('identifiant') == "") Redirect()
    var id = urlParams.get('identifiant')
    fetch("http://localhost:8080/api/auth/" + id,
    {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "GET"
})
.then(function(res){ 
  res.json().then(user => {

  }) 
})
.catch(function(res){ console.log(res) })
} else Redirect()

var Redirect = () => {
  document.location.href="./../index.html";
}