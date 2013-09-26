/* */

console.log(self.options);
document.head.removeChild(document.querySelectorAll("link")[1]);

let newIcon = document.createElement("link");
newIcon.href = self.options.open;
newIcon.rel = "shortcut icon";
newIcon.type = "image/x-icon";

document.head.appendChild(newIcon);


