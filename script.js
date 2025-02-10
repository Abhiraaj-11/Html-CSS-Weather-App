const userLocation= document.getElementById("userLocation"),
converter=document.getElementById("converter"),
weatherIcon=document.querySelector(".weatherIcon"),
temperature=document.querySelector(".temperature"),
feelsLike=document.querySelector(".feelsLike"),
description=document.querySelector(".description"),
date=document.querySelector(".date"),
city=document.querySelector(".city"),
Hvalue =document.getElementById("Hvalue"),
Wvalue =document.getElementById("Wvalue"),
SRvalue =document.getElementById("SRvalue"),
SSvalue =document.getElementById("SSvalue"),
Cvalue =document.getElementById("Cvalue"),
UVvalue =document.getElementById("UVvalue"),
Pvalue =document.getElementById("Pvalue"),
forecast =document.querySelector(".forecast");

WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?&appid=<YOUR-API-KEY>&units=metric&q=`;


function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response)=> response.json())
    .then((data) => {
        if (data.cod !="" && data.cod !=200) {
            alert(data.message);
            return;
        }
        console.log(data);
        city.innerHTML=data.name+ " " +data.sys.country;
        weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
        feelsLike.innerHTML="feels Like "  +data.main.feels_like;
        description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;` +data.weather[0].description;
        Hvalue.innerHTML=Math.round(data.main.humidity)+"<span>%</span>";
        Wvalue.innerHTML=Math.round(data.wind.speed)+"<span>m/s</span>";
        Cvalue.innerHTML=Math.round(data.clouds.all)+"<span>%</span>";
        UVvalue.innerHTML=Math.round(data.wind.speed)+"<span>%</span>";
        Pvalue.innerHTML=Math.round(data.main.pressure)+"<span>hPa</span>";
        
        temperature.innerHTML=tempConvert(data.main.temp);

        const options={
            weekday:"long",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            hour12: true,
        };

        date.innerHTML=getLongFormateDateTime(data.dt,data.timezone,options)


        const options1={
            hour:"numeric",
            minute:"numeric",
            hour12:true,
        };

        SRvalue.innerHTML=getLongFormateDateTime(data.sys.sunrise,data.timezone,options1);
        SSvalue.innerHTML=getLongFormateDateTime(data.sys.sunset,data.timezone,options1);

        
});
}

function formatUnixTime(dtvalue , offset , options={}){
    const date = new Date((dtvalue+offset)*1000);
    return date.toLocaleTimeString([],{timeZone:"UTC",...options});
}

function getLongFormateDateTime(dtvalue,offset,options){
    return formatUnixTime(dtvalue,offset,options)
}

function tempConvert(temp){
    let tempValue=Math.round(temp);
    let message="";
    if(converter.value=="°C"){
        message=tempValue+"<span>"+"\xB0C</span>";
    }
    else{
        let ctof=(tempValue*9)/5+32;
        message= ctof +"<span>"+"\xB0f</span>";
    }
    return message;
}
