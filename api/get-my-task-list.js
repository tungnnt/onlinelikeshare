const axios = require('axios')

module.exports = async (cookie, token, pageIndex, groupAdmin = '4234169246827020288') => {
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
        'status': '0',
        'pageIndex': pageIndex,
        'pageSize': '15',
        'groupAdmin': groupAdmin,
        'langType': '1',
        'token': token
    }

    const options = {
        url: 'https://onlinelikeshare.xyz/api/Task/GetTakeTaskList',
        method: 'POST'
    }

    const response = await axios({ method: options.method || 'GET', url: options.url, headers, data })
    
    return response.data
}
