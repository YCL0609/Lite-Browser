function search() {
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            var word = document.getElementById('word').value;
            if (word != "") {
                var regular = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                if (regular.test(word)) {
                    window.open(word);
                    location.reload();
                } else {
                    window.open("https://www.baidu.com/s?wd=" + word);
                    location.reload();
                };
            }
        }
    });
}