var input = document.querySelector('#input_city');
var nameCity = document.querySelector('.city');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.description');
var submitBtn = document.querySelector('#submitBtn');
var icon = document.createElement('img');
var card = document.querySelector('#card');
var displayOtherDays = document.querySelector('.displayOtherDays');

submitBtn.addEventListener('click',function(){
    displayOtherDays.innerHTML = '';
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=64964e9dc80048e0845182522212805&q=${input.value}&days=3&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {
        var tempValue = data['current']['temp_c'];
        var nameValue = data['location']['name'];
        var descValue = data['current']['condition']['text'];
        var image = data['current']['condition']['icon'];

        nameCity.innerHTML = nameValue;
        desc.innerHTML = `${descValue}`;
        temp.innerHTML = `${tempValue} C°`;
        card.appendChild(icon);
        icon.src = image;
        icon.classList.add('icon');
        input.value ="";
        
        
        for(var i=0;i<3;i++){
            var day = document.createElement('div');
            displayOtherDays.appendChild(day);
            day.classList.add('day');
            var dayTitle = document.createElement('p');
            day.appendChild(dayTitle);
            var otherdaysDate = data['forecast']['forecastday'][i]['date'];
            dayTitle.innerText = otherdaysDate;
            var otherDaysTemp = data['forecast']['forecastday'][i]['day']['avgtemp_c'];
            var dayTemp = document.createElement('h5');
            dayTemp.innerText = `${otherDaysTemp} C°`;
            day.appendChild(dayTemp);
            var dayDes = document.createElement('p');
            var otherDaysDes = data['forecast']['forecastday'][i]['day']['condition']['text'];
            dayDes.innerText = otherDaysDes;
            day.appendChild(dayDes);
            var dayIcon = document.createElement('img');
            var otherDaysIcon = data['forecast']['forecastday'][i]['day']['condition']['icon'];
            dayIcon.src = otherDaysIcon;
            day.appendChild(dayIcon);
        }

})


    })
