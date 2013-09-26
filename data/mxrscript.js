let resultCount = document.querySelectorAll("span.s0").length;

if(resultCount > 0) {
  if(resultCount == 1) {
      // Can we make things faster by opening the log automatically when only one result is shown?
  }
} else {
  // Lets insert links to search for this file on other trees.
  /* // But not yet.
    let myMessage = document.createElement("p");
    myMessage.textContent = "File not found. Maybe you should try searching another tree?";
    
    let newSearchLink = document.createElement("a");
    newSearchLink.textContent = "Search";
    
    myMessage.appendChild(newSearchLink.cloneNode());
    myMessage.appendChild(newSearchLink.cloneNode());
    myMessage.appendChild(newSearchLink.cloneNode());
    myMessage.appendChild(newSearchLink.cloneNode());
    
    document.body.insertBefore(myMessage, document.querySelectorAll("p.footer")[0]);
  */
}