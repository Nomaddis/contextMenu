# Context menu
For custom settings please modify menuItems array
For example using xhr request:
```
let menuItems = null;
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        menuItems = JSON.parse(this.responseText);
    }
});
xhr.open("GET", "https://reqres.in/api/users?page=1");
```