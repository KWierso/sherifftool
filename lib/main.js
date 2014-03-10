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
      let urlSearch = msg[1].slice(1,msg[1].length).split("&");
      
      // Default to searching mozilla-central (inbound/fx-team/etc aren't indexed on mxr)
      let mxrtree = "mozilla-central";
      
      if(urlSearch.length > 0) {
        for(let i of urlSearch) {
            let subsplit = i.split("=");
            // But Aurora, Beta, etc are indexed, so search them if we're on those trees
            if(subsplit[0] == "tree") {
              if(subsplit[1] == "Mozilla-Aurora" || subsplit[1] == "Mozilla-Beta" || 
                 subsplit[1] == "Mozilla-Release" || subsplit[1] == "Mozilla-Esr24") {
                 mxrtree = subsplit[1].toLowerCase();
              }
              
              //B2G teams have differing URLs on tbpl and mxr, so we need to do more than lowercase them
              if(subsplit[1] == "Mozilla-B2g26-v1.2") {
                mxrtree = "mozilla-b2g26_v1_2";
              }
              
              if(subsplit[1] == "Mozilla-B2g28-v1.3") {
                mxrtree = "mozilla-b2g28_v1_3";
              }
            }
            
        }
      } else {
      
      }
      
      tabs.open({
          url: "http://mxr.mozilla.org/" + mxrtree + "/find?text=&string=" + selection,
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
    clipboard.set("hg qbackout -r " + msg + " && hg qref -e && hg qfin -a && hg push");
  }
});
