{
    
    
    
    
    
    
    const tasks = [
        {
            content: "obejrzeć lekcje",
            done: true,
        },
        {
            content: "wykonać pracę domową",
            done: false,
        },
    ];
    
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
              ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    
    const init = () => {
        render();


    };

    init();

}