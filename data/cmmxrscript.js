self.on("click", function (node, data) {
    self.postMessage([window.getSelection().toString(), document.location.search]);
});