

export const fetchAnswer = async (prompt, apiKey) => {
    // const promptPrefix = "使用 Office JavaScript API 的 Excel API。"
    const promptPrefix = ""

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(apiKey)
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are proficient in the Excel JavaScript API and can help users write JavaScript code to manipulate Excel."},
                {
                    role: "user",
                    content: "根据我的指令写 JavaScript, 调用 Excel JavaScript API, 使用 async/await 特性"
                },
                {
                    role: "assistant",
                    content: "好的，以下是一个简单的示例代码，演示如何使用 Excel JavaScript API 在 Excel 工作表中插入数据。\n\n```javascript\nExcel.run(async (context) => {\n\n  // 获取当前活动的工作表\n  let sheet = context.workbook.worksheets.getActiveWorksheet();\n\n  // 插入数据\n  sheet.getRange(\"A1\").values = [[\"Name\", \"Age\", \"Gender\"]];\n  sheet.getRange(\"A2\").values = [[\"John\", 25, \"Male\"]];\n  sheet.getRange(\"A3\").values = [[\"Jane\", 30, \"Female\"]];\n  sheet.getRange(\"A4\").values = [[\"Bob\", 40, \"Male\"]];\n\n  // 执行操作\n  await context.sync();\n\n}).catch(function (error) {\n  console.log(\"Error: \" + error);\n});\n```\n\n在这个示例中，我们首先获取当前活动的工作表，然后使用 `getRange` 方法选定单元格范围，并使用 `values` 属性将数据写入单元格。最后，我们调用 `context.sync` 方法来执行操作并将更改保存到工作表中。\n\n你可以根据需要修改此代码，并使用 Office JavaScript API 执行其他操作，例如读取工作表数据、创建图表、设置格式等。"
                },
                {role: "user", content: promptPrefix + prompt}
            ],
            max_tokens: 1000,
            temperature: 0.7,
            presence_penalty: 0,
            frequency_penalty: 0,
            top_p: 1
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