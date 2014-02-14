var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var cm = require("sdk/context-menu");
var { ActionButton } = require("sdk/ui/button/action");
var clipboard = require("sdk/clipboard");
var data = require("sdk/self").data;

/* Lets use buttons until toolbars don't scroll weirdly
var { Toolbar } = require("sdk/ui/toolbar");
var { Frame } = require("sdk/ui/frame");
var treestatusframe = new Frame({
  url: "./treestatus.html"
});

var sherifftoolbar = Toolbar({
  title: "Sheriff Toolbar",
  items: [treestatusframe]
});
*/

var treestatusbutton = ActionButton({
  id: "treestatus-button",
  label: "TreeStatus",
  icon: {
    "32": "./treeicon.png" //Treestatus really needs its own icon so I don't have to resort to public domain icons...
  },
  onClick: function(state) {
      tabs.open("https://treestatus.mozilla.org");
  }
});
var mxrbutton = ActionButton({
  id: "mxr-button",
  label: "MXR",
  icon: {
    "16": "./mxricon.png"
  },
  onClick: function(state) {
      tabs.open("https://mxr.mozilla.org");
  }
});
var hgbutton = ActionButton({
  id: "hg-button",
  label: "Mercurial",
  icon: {
    "16": "./hgicon.png"
  },
  onClick: function(state) {
      tabs.open("https://hg.mozilla.org");
  }
});

/* This page-mod is empty at the moment.
pageMod.PageMod({
  include: "https://tbpl.mozilla.org/*",
  contentScriptFile: data.url("tbplscript.js")
});
*/

/* This page-mod is empty at the moment.
pageMod.PageMod({
  include: "https://mxr.mozilla.org/*",
  contentScriptFile: data.url("mxrscript.js")
});
*/

cm.Item({
  label: "Search MXR for selected file",
  context: [cm.URLContext("https://tbpl.mozilla.org/*"),
            cm.SelectorContext("div.summary"),
            cm.SelectionContext()],
  contentScriptFile: data.url("cmmxrscript.js"),
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

cm.Item({
  label: "Get backout text for this revision",
  context: [cm.URLContext("https://tbpl.mozilla.org/*"),
            cm.SelectorContext("a.revlink")],
  contentScriptFile: data.url("cmrevlinkscript.js"),
  onMessage: function(msg) {
    clipboard.set("hgqbackout -r " + msg + " && hg qref -e && hg qfin -a && hg push");
  }
});