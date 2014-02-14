self.on("click", function (node, data) {
    self.postMessage(node.getAttribute("data-rev"));
});