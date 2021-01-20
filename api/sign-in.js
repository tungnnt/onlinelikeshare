const axios = require('axios')

module.exports = async (cookie, phone, refCode = '50295144', groupAdmin = '4234169246827020288', password = 'c34660aa83babe459832cdaaf770fe55') => {
    const headers = {
        'authority': 'onlinelikeshare.xyz',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'content-type': 'application/json',
        'origin': 'https://onlinelikeshare.xyz',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://onlinelikeshare.xyz/',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': cookie
    }

    const data = {
        'phone': phone,
        'countryCode': '84',
        'smsCode': '',
        'verificationCode': '',
        'verificationKey': '',
        'password': password,
        'superiorCode': refCode,
        'gender': '0',
        'device': 'IOS',
        'longitude': '0',
        'latitude': '0',
        'groupAdmin': groupAdmin,
        'langType': '1'
    }

    const options = {
        url: 'https://onlinelikeshare.xyz/api/Account/SignIn',
        method: 'POST'
    }

    const response = await axios({ method: options.method || 'GET', url: options.url, headers, data })
    
    return response.data
}
