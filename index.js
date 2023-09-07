//nodejs fetch
const fetch = require("node-fetch");
const config = require("./config.json")

async function getAuthToken(config){

    let verificationTokenCookie, verificationTokenHTML, authToken;


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

    if (authToken){
        return authToken
    }else{
        return "error"
    }
}
