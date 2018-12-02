window.onload = function(){ 
  // your code here
  // console.log("onload");
  var link = "https://calendar.buffalo.edu/#main-content";
  document.body.innerHTML += '<div class="fb-share-button" data-href='+link+' data-layout="button_count"></div>';
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));