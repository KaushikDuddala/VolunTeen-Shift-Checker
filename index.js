const fetch = require("node-fetch");
const config = {"username":process.env["username"], "password":process.env["password"]}

async function getAuthToken(config){
    
    let verificationTokenCookie, verificationTokenHTML, authToken, invalidSessionTracker;
    
    
    await fetch("https://app.betterimpact.com/Login/LoginNoSearch").then(async res => {
        verificationTokenCookie = await res.headers.get('set-cookie').match(/__RequestVerificationToken=(.*?);/)[1]
        const resText = await res.text(); verificationTokenHTML = await resText.match(/"__RequestVerificationToken" type="hidden" value="(.*?)"/)[1];
    })


    await fetch("https://app.betterimpact.com/Login/Login", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": `__RequestVerificationToken=${verificationTokenCookie}`,
        },
        "body": `__RequestVerificationToken=${verificationTokenHTML}&UserName=${config.username}&Password=${config.password}&ReturnUrl=&AgencyGuid=`,
        "method": "POST",
        "redirect": "manual"
    }).then(async res => {
        authToken = await res.headers.get('set-cookie').match(/.vol2auth=(.*?);/)[1]
    });


    await fetch("https://app.betterimpact.com/Volunteer/Main", {
        "headers": {
            "cookie": `__RequestVerificationToken=${verificationTokenHTML}; .vol2auth=${authToken}; user_login_context=MIP`,
        },
        "body": null,
        "method": "GET"
    }).then(res => {
        invalidSessionTracker = res.headers.get('set-cookie').match(/invalidSessionTracker=(.*?);/)[1]
    });
    if (authToken){
        return {"authToken": authToken, "invalidSessionTracker": invalidSessionTracker}
    }else{
        return "error"
    }
}

async function getVolunteeringShifts(loginContext){
    let shiftsAvailable = false;
    let shiftsNumbers = [];
    const vol2auth =  loginContext.authToken;
    const invalidSessionTracker = loginContext.invalidSessionTracker;
    const sessionHeartbeat = "OK";
    
    await fetch("https://app.betterimpact.com/Volunteer/Schedule/FilterOpportunities", {
        "headers": {
            "x-requested-with": "XMLHttpRequest",
            "cookie": `invalidSessionTracker=${invalidSessionTracker}; .vol2auth=${vol2auth}; sessionHeartbeat=${sessionHeartbeat};`,
        },
        "body":"SortOrder=0&GroupByCategory=true&HasSingleMembership=True",
        "method": "POST"
    }).then(async res => {
        const resText = await res.text();
        await resText.match(/<td class="right">(\d+?)<\/td>/g).forEach(async item => {
            shiftsNumbers.push(await item.match(/(\d+)/g))
        })
    });
    if(shiftsNumbers.length > 0){
        shiftsAvailable = true;
    }
    return {"shiftsAvailable": shiftsAvailable, "shiftsNumbers": shiftsNumbers}
}

let shiftNumberKeeper = [];

async function main(){
    shifts = await getVolunteeringShifts(await getAuthToken(config))
    if(shifts.shiftsNumbers.toString() != shiftNumberKeeper.toString()){
        await fetch('https://ntfy.sh/fplvolunteenoppalerterV2', {
            method: 'POST', // PUT works too
            body: `Shifts are ${shifts.shiftsNumbers}`,
            headers:{
              'Title':"New shifts available!"
            }
        })
    }
    shiftNumberKeeper = shifts.shiftsNumbers
}

setInterval(main, 600000)
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

const express = require('express')
const app = express()
const port = 10000

app.get('/', (req, res) => {
  var time = process.uptime();
  var uptime = (time + "").toHHMMSS();
  res.send(uptime)
})

app.listen(port, () => {})