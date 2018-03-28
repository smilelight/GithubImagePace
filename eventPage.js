// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   var tabUrl = tabs[0].url;
//   var reg = /https:\/\/github\.com\/.*/;
//   if (reg.test(tabUrl)) {
//     var contextMenuItem = {
//       id: "getAddress",
//       title: "获取绝对地址",
//       contexts: ["link", "image"]
//     };
//     chrome.contextMenus.create(contextMenuItem);
//     chrome.contextMenus.onClicked.addListener(function(clikData) {
//       if (clikData.menuItemId == "getAddress") {
//         var url;
//         if (clikData.mediaType == "image") {
//           url = clikData.srcUrl;
//         } else {
//           url = clikData.linkUrl;
//         }
//         var notifiOptions = {
//           type: "image",
//           iconUrl: "icon.png",
//           title: "复制成功！",
//           message: "该图片的绝对地址已经复制到粘贴板中。",
//           imageUrl: url
//         };
//         chrome.notifications.create("copylinkNotif", notifiOptions);
//       }
//     });
//   }
// });

/* var contextMenuItem = {
    id: "getAddress",
    title: "获取绝对地址",
    contexts: ["link", "image"]
  };
  chrome.contextMenus.create(contextMenuItem);
  chrome.contextMenus.onClicked.addListener(function(clikData) {
    if (clikData.menuItemId == "getAddress") {
      var url;
      if (clikData.mediaType == "image") {
        url = clikData.srcUrl;
      } else {
        url = clikData.linkUrl;
      }
      var notifiOptions = {
        type: "image",
        iconUrl: "icon.png",
        title: "复制成功！",
        message: "该图片的绝对地址已经复制到粘贴板中。",
        imageUrl: url
      };
      chrome.notifications.create("copylinkNotif", notifiOptions);
    }
  }); */

/* var contextMenuItem = {
    id: "getAddress",
    title: "获取绝对地址",
    contexts: ["link", "image"]
  };
  chrome.contextMenus.create(contextMenuItem);
  chrome.contextMenus.onClicked.addListener(function(clikData) {
    if (clikData.menuItemId == "getAddress") {
      var url;
      if (clikData.mediaType == "image") {
        url = clikData.srcUrl;
      } else {
        url = clikData.linkUrl;
      }
      var notifiOptions = {
        type: "basic",
        iconUrl: url,
        title: "复制成功！",
        message: "该图片的绝对地址已经复制到粘贴板中。",
      };
      chrome.notifications.create("copylinkNotif", notifiOptions);
    }
  }); */

/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.pageAction.show(tabs[0].id);
      var contextMenuItem = {
        id: "getAddress",
        title: "获取绝对地址",
        contexts: ["link", "image"]
      };
      chrome.contextMenus.create(contextMenuItem);
      chrome.contextMenus.onClicked.addListener(function(clikData) {
        if (clikData.menuItemId == "getAddress") {
          var url;
          if (clikData.mediaType == "image") {
            url = clikData.srcUrl;
          } else {
            url = clikData.linkUrl;
          }
          var notifiOptions = {
            type: "basic",
            iconUrl: "icon.png",
            title: "复制成功！",
            message: "该图片的绝对地址已经复制到粘贴板中。"
          };
          chrome.notifications.create("copylinkNotif", notifiOptions);
        }
      });
    });
  }
}); */
var tabItemId = "getAddress";
var format = true;
chrome.tabs.onActiveChanged.addListener(function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var tabUrl = tabs[0].url;
    var reg = /https:\/\/github\.com\/.*/;
    if (reg.test(tabUrl)) {
      chrome.storage.sync.get("ismenuexist", function (item) {
        if (item["ismenuexist"]) {
          //do nothing!
        } else {
          var contextMenuItem = {
            id: tabItemId,
            title: "获取绝对地址",
            contexts: ["link", "image"]
          };
          chrome.contextMenus.create(contextMenuItem);
          chrome.contextMenus.onClicked.addListener(function (clikData) {
            if (clikData.menuItemId == "getAddress") {
              var url;
              if (clikData.mediaType == "image") {
                url = clikData.srcUrl;
                url = url.substring(0,url.indexOf('?'));
              } else {
                url = clikData.linkUrl;
              }
              url = url.replace(/blob/,"raw");
              if(format) {
              url = "!["+url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'))+"]("+url+")";//https://github.com/smilelight/images/raw/master/wxapp_component/Image1.png
              }
              //![https://github.com/smilelight/images/raw/master/wxapp_component/Image1.png](https://github.com/smilelight/images/raw/master/wxapp_component/Image1.png)
              //url = "https://github.com"+rul;
              //![https://github.com/smilelight/images/raw/master/wxapp_component/Image1.png](https://github.com/smilelight/images/raw/master/wxapp_component/Image1.png)
              var notifiOptions = {
                type: "basic",
                //iconUrl: url,
                iconUrl:"icon.png",
                title: "复制成功！",
                //message: "该图片的绝对地址已经复制到粘贴板中。"
                message: url
              };
              copyToClipboard(url);
              chrome.tabs.query({active:true,currentWindow:true},function(tabs){
                chrome.tabs.sendMessage(tabs[0].id,{todo:"copyToClipboard",url:url});
                 chrome.notifications.create("copylinkNotif", notifiOptions);
              });
             
            }
          });
          chrome.storage.sync.set({
            ismenuexist: true
          });
        }
      });
    } else {
      chrome.storage.sync.get("ismenuexist", function (item) {
        if (item["ismenuexist"]) {
          chrome.contextMenus.remove(tabItemId);
          chrome.storage.sync.remove("ismenuexist");
        } else {
          //do nothing!
        }
      });
    }
  });
});

function copyToClipboard( text ){
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}
