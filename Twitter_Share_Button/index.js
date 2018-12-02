function tweet(){ 
	var link = "https://calendar.buffalo.edu/#main-content";
	window.open("https://twitter.com/share?url="+link+"&text="+document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
	return false; 
}