var changesets = document.getElementById("viewerOutput").getElementsByClassName("files hiddenContent");
for(let i in changesets) {
  try {
    if(changesets[i].textContent.search(/\/tests\//g) >= 0 || 
       changesets[i].textContent.search(/\/test\//g) >= 0 || 
       changesets[i].textContent.search(/test_/g) >= 0) {
      changesets[i].parentNode.getElementsByClassName("testsuite")[0].selectedIndex = 2;
    }
  } catch(e) { console.log(i); console.log(e);}
}

self.port.emit("destroy", "");
