function createMenu(items, parentElement) {
    items.forEach(item => {
        const li = document.createElement("li");

        const button = document.createElement("button");
        const icon = document.createElement("i");
        icon.classList.add(...item.icon.split(" "));
        button.appendChild(icon);
        button.appendChild(document.createTextNode(item.title));
        
        li.appendChild(button);
        
        if (item.subMenu.length > 0) {
            const subMenu = document.createElement("ul");
            createMenu(item.subMenu, subMenu);
            li.appendChild(subMenu);

            button.addEventListener("click", () => {
                li.classList.toggle("active");
            });
        }
        
        parentElement.appendChild(li);
    });
}

fetch('menuData.json')
    .then(response => response.json())
    .then(data => {
        const menuList = document.getElementById("menuList");
        createMenu(data, menuList);
    })
    .catch(error => console.error('Error loading the menu data:', error));
