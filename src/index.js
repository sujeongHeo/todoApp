import './main.css';
import { dateDiff } from './timeCal';

//목록을 가져와요
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// x 버튼 누르면 목록이 안 보여요.
var close = document.getElementsByClassName("close");

var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// 리스트 아이템을 누르면, 체크가 되어요.
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

const addClass = document.getElementsByClassName('addBtn');
addClass[0].addEventListener("click", function () {
  addList();
});

// 새로운 아이템을 입력해요 
function addList() {
  var li = document.createElement("li");
  var inputCon = document.getElementById("myContent").value;
  // 완료 날짜를 입력해요
  var inputDue = document.getElementById("myDue").value;
  var ct = document.createTextNode(inputCon);
  li.appendChild(ct);
  
  // 내용이 비워져있으면 안돼요.
  if (inputCon === '') {
    alert("내용 입력은 필수 입니다..");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myContent").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  if(dateDiff(inputDue)) {  // dateDiff 있을때만 
    var dueSpan = document.createElement("SPAN");
    var dueTxts = document.createTextNode(" D - " + dateDiff(inputDue) + "");
    dueSpan.className = "DueDate";
    dueSpan.appendChild(dueTxts);
    li.appendChild(dueSpan);
  }


  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
