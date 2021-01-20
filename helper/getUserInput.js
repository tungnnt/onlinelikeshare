const prompts = require('prompts')

module.exports = async () => {
    const response = await prompts(
        {
            type: 'text',
            name: 'value',
            message: 'Enter the phone number of the lastest run?'
        }
    )

    const { value } = response
    return { value }
}