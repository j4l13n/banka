function openTab(evt, tabName) {
    var i, tabContent, links;

    tabContent = document.getElementsByClassName("tabContent");
    for(i = 0; i < tabContent.length; i++) {
	    tabContent[i].style.display = "none";
    }


    links = document.getElementsByClassName("links");
    for(i = 0; i < links.length; i++) {
	links[i].className = links[i].className.replace(" active", "");
	}

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
