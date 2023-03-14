

export const fetchAnswer = async (prompt, apiKey) => {
    const promptPrefix = "使用 Office JavaScript API 的 Excel API。"

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(apiKey)
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "你是一个 Excel 高手，精通 Office JavaScript API，帮用户写 JavaScript 代码来操作 Excel"},
                {role: "user", content: promptPrefix + prompt}
            ]
        })
    };

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await res.json()
        return data.choices[0].message.content
    } catch (e) {
        console.log('Error: ', e)
    }
}