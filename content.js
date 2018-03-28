chrome.runtime.sendMessage({
    todo: "showPageAction"
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.todo == "copyToClipboard"){
        //copyToClipboard(request.url);
        //copyToClipboard2(request.url);
    }
});

// var copytext;
// var copybut = document.createElement("button");
// var copytt = document.createTextNode("hahaha");
// document.body.appendChild(copytt);
// copybut.value = "按钮";
// copybut.text = "按钮";
// document.body.appendChild(copybut);
// copybut.addEventListener("click",copyToClipboard(copytext));
//copy.addListener(copyToClipboard(copytext));
function copyToClipboard( text ){//这个方法可以，本程序就是用的这个
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

  function copymytest(text){//自己写的不能用
      var textnode = document.createTextNode(text);
      textnode.contenteditable=true;
      var range = document.createRange();
      range.selectNode(textnode);
      window.getSelection().addRange(range);
      document.execCommand("copy", false, null);
      document.removeChild(textnode);
  }

  function copyToClipboard2(text) {//这个方法也可以，已经过测试
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  };