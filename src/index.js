import './main.css';
import { calTime } from './timeCal';

// import styles from './index.module.css';

const addClass = document.getElementsByClassName('addBtn');
addClass[0].addEventListener("click", function () {
  newElement();
});

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputCon = document.getElementById("myContent").value;
  var inputDue = document.getElementById("myDue").value;
  console.log(calTime(inputDue),"sdfsdf");
  var ct = document.createTextNode(inputCon);
  li.appendChild(ct);
  if (inputCon === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myContent").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  var spans = document.createElement("SPAN");
  var txts = document.createTextNode("- " + calTime(inputDue));
  spans.className = "closse";
  spans.appendChild(txts);
  li.appendChild(spans);


  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
