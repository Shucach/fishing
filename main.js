/**
 * Author: Ivan Horobets
 * URL: vanzzo.net
 */

var locations = document.getElementById('location');

//Initial location
locations.onclick = function (e) {

   //Initial object span. This is point intro water.
   locations.innerHTML = '';
   var newPoint = document.createElement('span');
   newPoint.style.left = e.layerX + 'px';
   newPoint.style.top = e.layerY + 'px';

   //Insert object
   locations.appendChild(newPoint);
   Fishing.pesks(1, 5);
};

//Get Fish
document.onkeydown = function (e) {
   if(e.keyCode == 71 && flagPesk == 1) {
      Fishing.strongFish();
   }
};

//Fish OK
var fishOK = document.getElementById('ok_fish');
var popup = document.getElementById('fish_popup');
fishOK.onclick = function () {
   //Reset fish, and add to statistics
   popup.style.display = 'none';
   flagPesk = 0;

   Fishing.statistics(fishRes['id'], fishRes['name'], fishRes['weight'])
};

//Class fish actions
var flagPesk = 0;
var fishID = null;
var fishRes = {};

var Fishing = {
   pesks: function (min, max) {
      var timePesk = Math.floor(Math.random() * (max - min)) + min;
      timePesk = timePesk * 1000;

      setTimeout(function () {
         flagPesk = 1
      }, timePesk);

      setTimeout('PlaySound(\'popl.wav\')', timePesk);
   },
   getFish: function (min, max) {
      var newTitle = document.getElementById('name_fish');
      var newImg = document.getElementById('images_fish');
      var newWeight = document.getElementById('weight_fish');

      //Set fish
      fishID = Math.floor(Math.random() * (max - min)) + min;
      var fish = fishObject[fishID];
      var fishWeight = Math.floor(Math.random() * (fish['max_weight'] - fish['min_weight'])) + fish['min_weight'];

      newTitle.innerHTML = fish['name'];
      newImg.src = fish['img'];

      fishWeight = fishWeight/1000;
      newWeight.innerHTML = fishWeight + ' кг';

      locations.innerHTML = '';

      //To statistics
      fishRes = {
         "id": fish['id'],
         "name": fish['name'],
         "weight": fishWeight
      };

   },
   statistics: function (id, name, weight) {
      var stat = document.getElementById('statistics');
      var rowRes = document.createElement('span');
      var getRealRess = document.getElementById('fish_' + id);
      if(getRealRess == null) {
         rowRes.id = 'fish_' + id;
         rowRes.setAttribute('data-weight', weight);
         rowRes.setAttribute('data-count', 1);
         rowRes.innerHTML = name+': 1шт, загальна вага ' + weight + ' кг';
         stat.appendChild(rowRes);
      } else {
         var weightSumm = parseFloat(getRealRess.getAttribute('data-weight')) + parseFloat(weight);
         var oldCount = getRealRess.getAttribute('data-count');

         getRealRess.setAttribute('data-weight', weightSumm);
         getRealRess.setAttribute('data-count', ++oldCount);
         getRealRess.innerHTML =  name+': '+ oldCount +'шт, загальна вага ' + weightSumm + ' кг';
      }
   },
   strongFish: function () {
      this.getFish(1, 3);

      //Show fish
      var popup = document.getElementById('fish_popup');
      popup.style.display = 'block';
   }
};

//Sound fow actions
function PlaySound(action) {
   var sound = document.getElementById('fish_sound');
   sound.src = 'mp3/' + action;
   sound.play();
}

//Object Fishing
var fishObject = {
   1: {
      id: "1",
      name: "Карась річковий",
      img: "images/fishing/caras.jpg",
      strong: "1",
      min_weight: 10,
      max_weight: 5000

   },
   2: {
      id: "2",
      name: "Плотва звичайна",
      img: "images/fishing/plotva.jpg",
      strong: "1",
      min_weight: 10,
      max_weight: 3200
   }
};



