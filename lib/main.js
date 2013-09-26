var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var cm = require("sdk/context-menu");
var data = require("self").data;


pageMod.PageMod({
  include: "https://tbpl.mozilla.org/*",
  contentScriptFile: data.url("tbplscript.js"),
  contentScriptOptions: {
      open: data.url("index-open.png"),
      closed: data.url("index-closed.png"),
      approval: data.url("index-approval-required.png")
  }
});

cm.Item({
  label: "Search MXR for selected file",
  context: [cm.URLContext("https://tbpl.mozilla.org/*"),
            cm.SelectorContext("div.summary"),
            cm.SelectionContext()],
  contentScriptFile: data.url("cmscript.js"),
  onMessage: function(msg) {
      let selection = msg[0];
      let urlSearch = msg[1].split("&");
      
      for(let i of urlSearch) {
          // Do something with the information from the tbpl URL (search specific tree?)
          /*console.log(i);*/
      }
      
      tabs.open({
          url: "http://mxr.mozilla.org/mozilla-central/find?text=&string=" + selection,
          onReady: function onOpen(tab) {
            tab.attach({
              contentScriptFile: data.url("mxrscript.js")
            })
          }
      })
  }
});