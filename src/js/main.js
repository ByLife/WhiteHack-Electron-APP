const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('identifiant')){
    var id = urlParams.get('identifiant')
    fetch("/echo/json/",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({a: 1, b: 2})
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })
}


// document.location.href="./../index.html";