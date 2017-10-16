// Criação do módulo principal e suas dependências
angular.module('s2bApp',['appRoutes', 'userControllers', 'projectControllers', 'commentControllers'])

function openTab(evt, tabName, btnName) {
  var tabWraps, tabBtns;
  tabWraps = document.getElementsByClassName("tabWrap");
  for (let i = 0; i < tabWraps.length; i++) {
    if(tabName == tabWraps[i].id) {
      tabWraps[i].classList.add("tabWrapCurrent");
    } else {
      tabWraps[i].classList.remove("tabWrapCurrent");
    }
  }
  tabBtns = document.getElementsByClassName("profileNavdBtn");
  for (let i = 0; i < tabBtns.length; i++) {
    if(btnName == tabBtns[i].id) {
      tabBtns[i].classList.add("profileNavdBtnCurrent");
    } else {
      tabBtns[i].classList.remove("profileNavdBtnCurrent");
    }
  }
}

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
