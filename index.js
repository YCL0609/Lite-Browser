window.onload = () => {
    const rootname = localStorage.getItem('rootname');
    const input_Element = document.getElementById('root');
    const select_Element = document.getElementById("RootSelect");
    const markadd_Element = document.getElementById('markadd');
    const markdel_Element = document.getElementById('markdel');
    const markaddchick_Element = document.getElementById('markadd-chick');
    const markdelchick_Element = document.getElementById('markdel-chick');

    // 下拉选择菜单事件
    select_Element.addEventListener("change", (event) => {
        var selectedValue = event.target.value;
        if (selectedValue == "self") { // 自定义
            input_Element.style.display = "";
            localStorage.setItem('rootname', 'self')
        } else if (selectedValue == "baidu") { // 百度
            localStorage.setItem('root', 'https://www.baidu.com/s?wd=');
            localStorage.setItem('rootname', 'baidu');
            input_Element.style.display = "none"
        } else if (selectedValue == "bing") { // Bing
            localStorage.setItem('root', 'https://cn.bing.com/search?q=');
            localStorage.setItem('rootname', 'bing');
            input_Element.style.display = "none"
        }
    });

    // 自定义搜索引擎事件
    input_Element.addEventListener('input', () => {
        // 将自定义搜索引擎存储到localStone
        localStorage.setItem('root', input_Element.value)
    });

    // 添加书签事件
    markadd_Element.addEventListener('click', () => {
        markadd_Element.style.display = "none";
        markdel_Element.style.display = "none";
        document.getElementById('markadd-div').style.display = "";
    });

    // 添加书签确认事件
    markaddchick_Element.addEventListener('click', () => {
        const title = document.getElementById('markadd-name').value;
        const url = document.getElementById('markadd-url').value;
        const id = Date.now(); // 创建一个唯一的ID用于标识书签
        const bookmarkId = 'bookmark_' + id;
        markadd_Element.style.display = "";
        markdel_Element.style.display = "";
        document.getElementById('markadd-div').style.display = "none";
        if (title && url) {
            // 创建一个包含URL和标题的对象
            const bookmark = {
                url: "http://" + url,
                title: title,
                id: id
            };
            // 将书签存储在localStorage中
            localStorage.setItem(bookmarkId, JSON.stringify(bookmark));
            // 显示书签
            addbookmark("http://" + url, title, id);
        }
    })

    // 删除书签事件
    markdel_Element.addEventListener('click', () => {
        markadd_Element.style.display = "none";
        markdel_Element.style.display = "none";
        document.getElementById('markdel-div').style.display = "";
    });

    // 删除书签确认事件
    markdelchick_Element.addEventListener('click', () => {
        markadd_Element.style.display = "";
        markdel_Element.style.display = "";
        document.getElementById('markdel-div').style.display = "none";
        // 获取已选择选项的值和索引
        var selectElement = document.getElementById('markdel-selsct');
        var selectedIndex = selectElement.selectedIndex; // 获取当前选中项的索引
        var selectedValue = selectElement.options[selectedIndex].value; // 获取当前选中项的文本内容
        // 删除localStorage数据
        localStorage.removeItem("bookmark_" + selectedValue);
        // 删除下拉选择菜单数据
        selectElement.remove(selectedIndex);
        // 文字增加删除线
        var linkElement = document.getElementById("bookmark-" + selectedValue)
        linkElement.href = "#";
        linkElement.style.textDecoration = "line-through";
    })

    // 设置用户默认搜索引擎
    if (rootname == "baidu") { // 百度
        var optionElement = select_Element.querySelector('option[value="baidu"]');
        optionElement.selected = true
    } else if (rootname == "self") { // 自定义
        var optionElement = select_Element.querySelector('option[value="self"]');
        optionElement.selected = true;
        input_Element.value = localStorage.getItem('root')
        input_Element.style.display = null
    } else { // Bing或首次运行
        localStorage.setItem('root', 'https://cn.bing.com/search?q=');
        localStorage.setItem('rootname', 'bing');
        var optionElement = select_Element.querySelector('option[value="bing"]');
        optionElement.selected = true
    };

    // 书签处理
    for (let i = 0; i < localStorage.length; i++) { // 遍历localStorage中的所有项
        const key = localStorage.key(i);
        // 检查是否是书签项
        if (key.startsWith('bookmark_')) {
            // 获取书签数据并解析为对象
            const bookmark = JSON.parse(localStorage.getItem(key));
            addbookmark(bookmark.url, bookmark.title, bookmark.id)
        }
    }

    // 输入框回车事件
    var word = document.getElementById('word')
    word.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            urljump();
            location.reload();
        }
    });
}

// 网页跳转事件
function urljump() {
    var url = document.getElementById("word").value;
    if (url != "") {
        // 使用正则表达式验证是否为URL
        var pattern = new RegExp('^(https?:\\/\\/)' +// 协议部分
            '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,}|' + // 域名部分
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP地址部分
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // 端口号和路径部分
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 查询字符串部分
            '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // 锚点部分
        if (pattern.test(url)) {
            window.open(url);
        } else {
            var root = localStorage.getItem('root');
            window.open(root + url);
        }
    }
}

// 添加书签到网页
function addbookmark(url, title, id) {
    const bookDiv = document.getElementById('bookmark-index');
    const delopt = document.getElementById('markdel-selsct');
    // 创建元素并添加到书签div中
    const link = document.createElement('a');
    const br = document.createElement('br');
    link.onclick = () => { window.open(url) };
    link.textContent = title;
    link.href = "#"
    link.id = "bookmark-" + id;
    bookDiv.appendChild(link);
    bookDiv.appendChild(br);
    // 创建元素并添加到删除书签中
    const option = document.createElement('option');
    option.value = id;
    option.textContent = title;
    delopt.appendChild(option);
}