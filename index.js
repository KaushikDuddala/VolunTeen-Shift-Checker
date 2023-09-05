//nodejs fetch
const fetch = require("node-fetch");

const regex = /<td class="right">(\d+)<\/td>/g


async function main(){
    message = "ERROR CHECK CODE"
    send = true

    await fetch("https://app.betterimpact.com/Login/LoginNoSearch").then(async res => {
        console.log(await res.headers.get('set-cookie').match(/__RequestVerificationToken=(.*?);/)[1])
    })
}
main()
    /*
    fetch("https://app.betterimpact.com/Volunteer/Schedule/FilterOpportunities", {
    "headers": {
        "accept": "*\/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_gcl_aw=GCL.1691535775.Cj0KCQjwz8emBhDrARIsANNJjS6Mrud0GXJx-vfLGAlTt0aBAFvdL7KfQXToOWbPY7sIAe5zR1zrncIaAisMEALw_wcB; _gcl_au=1.1.1753859965.1691535775; _ce.s=v~5846718187fc33d6bcf09cfa466afbff5ee1e856~lcw~1691535775821~vpv~0~ir~1~gtrk.la~ll2wq5w3~lcw~1691535775827; user_login_context=MIP; intercom-id-zptp2z2m=f2325d98-5b48-48c3-a93e-39d274c206df; intercom-device-id-zptp2z2m=83f85651-fa70-4292-84b8-84978102d3a8; _ga_SD8R4564BY=GS1.1.1691600598.1.1.1691600600.0.0.0; _ga=GA1.2.1291886288.1691535780; _ga_MN7J4W1BKH=GS1.1.1691600602.2.1.1691600726.0.0.0; __RequestVerificationToken=E63Nw4_YOixy-obV5hYOeSjuW3oZn-h63EgQMB4-_B-POlaaHlZPoBUp6NekDiDr04kcqgF4ovp78uiQZSxrEANCPaM1; invalidSessionTracker={\"UserId\":8588681,\"AgencyId\":0,\"RoleId\":3}; sessionHeartbeat=ok; .vol2auth=8764ACFB5CE87D32A93366F192CD7E1248E20E7179A7796184B06D4DA2E5FCB9D965C7A4C7C8922DB77225415D8A9F1C7652A353A7A6A5CAC59C6C55BDB70B951495A149E1B3B0A3FE04642BEC107F39AE59881ED2467A851039A35EA150CB0D3C136FD1F77FBD01710619DA5AB11EBEE1EAFDA790F160DA6732E45CDB5890216B4A82FB8B35763954443258DE1B34C88A0D191CDF8AD02860DD5E42A2B94423F50B505C9B683DF214D28A07BA5A7A7D7A05DB0D3593DF60D0AFAD34EF849195AA434D63EA276D04DC85CAF1727651B4CEBD0C6FE44E44E146A423601665FDD9326EF9F029781A3AA1739CBD1F976F0366058187C0E0AECC50A4F7B98B1B5DF96C4D47FA; lastNonRequestTimestamp=1693859684",
        "Referer": "https://app.betterimpact.com/Volunteer/Schedule/Opportunities",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "SortOrder=0&GroupByCategory=true&HasSingleMembership=True",
    "method": "POST"
}).then(async res => {
    
    const text = await res.text()
    const matches = await text.match(regex)
    console.log(matches)
    shifts = 0
    if(matches == null){
        await fetch('https://ntfy.sh/fplvolunteenoppalerterV2', {
        method: 'POST', // PUT works too
        body: "link stopped working dead lol"
    })
}else{
    await matches.forEach(element => {
        if(element != '<td class="right">0</td>'){
            shifts += element.match(/\d+/g)
        }
    });
    if (shifts == 0){
        message = "No shifts available"
        send = false
    }else if (shifts > 0){
        message = shifts + " shifts available"
    }
    if (send){
        await fetch('https://ntfy.sh/fplvolunteenoppalerterV2', {
        method: 'POST', // PUT works too
        body: message
    })
}
}
})
}

setInterval(main, 60000)*/
