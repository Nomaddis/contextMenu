// console.log("sfsfsf");
'use strict'
class contextMenu {
    constructor() {}

}
(function() {
    /**
     * list of items
     * @type {[*]}
     * @param id - item id, link - href for ancor, status - active or inactive
     */
    var menuItems = [
        {id: 'item1', link: '', status: 'active'},
        {id: 'item2', link: '', status: 'active'},
        {id: 'item3', link: '', status: 'active',
            submenu: [
                {id: 'item3.1', link: '', status: 'active'},
                {id: 'item3.2', link: '', status: 'active'},
                {id: 'item3.3', link: '', status: 'inactive'}
            ]
        },
        {id: 'item4', link: '', status: 'active'},
        {id: 'item5', link: '', status: 'inactive'},
        {id: 'item7', link: '', status: 'inactive'},
        {id: 'item8', link: '', status: 'inactive'},
        {id: 'item9', link: '', status: 'inactive'},
        {id: 'item10', link: '', status: 'inactive'},
        {id: 'item11', link: '', status: 'active',
            submenu: [
                {id: 'subitem11.1', link: '', status: 'active'},
                {id: 'subitem11.2', link: '', status: 'active'},
                {id: 'subitem11.3', link: '', status: 'inactive'}
            ]
        },
        {id: 'item12', link: '', status: 'inactive'},
        {id: 'item13', link: '', status: 'inactive'},
        {id: 'item14', link: '', status: 'inactive'},
        {id: 'item15', link: '', status: 'inactive'},
        {id: 'item16', link: '', status: 'inactive'},
        {id: 'item17', link: '', status: 'inactive'},
        {id: 'item18', link: '', status: 'inactive'},
        {id: 'item19', link: '', status: 'inactive'},
        {id: 'item20', link: '', status: 'inactive'},
        {id: 'item21', link: '', status: 'inactive'},
        {id: 'item22', link: '', status: 'inactive'},
        {id: 'item23', link: '', status: 'inactive'},
        {id: 'item24', link: '', status: 'inactive'}
    ];
    /*
    ajax here with menu parameters (menuItems arr)
     */
    document.write(startMenuBuild(menuItems));
    function buildMenu(menuItems, submenu) {
        var result = '';
        (submenu) ? result += '<ul>' : result += '<ul id="innerMenu">';
        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems[i];
            if (item.status === 'inactive') {
                result += '<li class="inactive">';
                result += item.id;
                result += '</li>';
            } else {
                if (item.submenu) {
                    result += '<li class="submenu">';
                    result += '<a href="' + item.link + '">' + item.id + '</a>';
                    result += '<div class="wrapper">';
                    result += buildMenu(item.submenu, true);
                    result += '</div>';
                } else {
                    result += '<li>';
                    result += '<a href="' + item.link + '">' + item.id + '</a>';
                }
                result += '</li>';
            }
        }
        result += '</ul>';
        return result;
    }
    function startMenuBuild(menuItems) {
        var buildedMenu = '<div id="contextMenu"><div id="scrollUp"></div>';
        buildedMenu += buildMenu(menuItems, false);
        buildedMenu += '<div id="scrollDown"></div></div>';
        return buildedMenu;
    }
    var menu = document.getElementById("contextMenu");
    var innerMenu = document.getElementById("innerMenu");
    var scrollUpButton = document.getElementById("scrollUp");
    var scrollDownButton = document.getElementById("scrollDown");
    var menuItemHeight = document.getElementsByClassName("submenu")[0].clientHeight;

    function placeMenu(eventArgs) {
        menu.style.zIndex = 99;
        menu.style.left = eventArgs.pageX + 5 + 'px';
        menu.style.top = eventArgs.pageY + 'px';
    }

    function show() {
        var menuHeight = menuItems.length * menuItemHeight;
        if (menuHeight + parseInt(menu.style.top) >= window.innerHeight) {
            innerMenu.style.height = Math.floor( (window.innerHeight - parseInt(menu.style.top) - scrollUpButton.offsetHeight -
                    scrollDownButton.offsetHeight) / menuItemHeight ) * menuItemHeight + 'px';
            scrollUpButton.style.display = "block";
            scrollDownButton.style.display = "block";
            innerMenu.style.overflow = "hidden";
            menu.style.visibility = "visible";
        } else {
            scrollUpButton.style.display = "none";
            scrollDownButton.style.display = "none";
            innerMenu.style.overflow = "visible";
            innerMenu.style.height = "auto";
            menu.style.visibility = "visible";
        }
    }
    function hide() {
        menu.style.visibility = "hidden";
        innerMenu.style.height = "auto";
    }
    (function() {
        var submenuScope = document.getElementsByClassName("submenu");
        var submenuStyle = document.getElementsByClassName("wrapper");
        for(var i = 0; i < submenuScope.length; i++) {
            (function(n) {
                submenuScope[n].addEventListener("mouseover", function() {
                    var itemTopPosition = submenuScope[n].offsetTop - innerMenu.scrollTop;
                    submenuStyle[n].style.top = itemTopPosition + 'px';
                })
            })(i);
        }
    })();

    /**
     * click and show context menu
      */
    document.getElementById("testarea").addEventListener("click", function(eventArgs) {
        // eventArgs = (eventArgs) ? eventArgs : ((event) ? event : null);
        var isVisible = menu.style.visibility === "visible";
        if (isVisible) {
            hide();
        } else {
            placeMenu(eventArgs);
            show();
        }
    });

    // document.getElementById('testarea').oncontextmenu = function (eventArgs) {
    //     eventArgs = (eventArgs) ? eventArgs : ((event) ? event : null);
    //     if (typeof eventArgs.preventDefault != "undefined") {
    //         eventArgs.preventDefault();
    //     } else {
    //         eventArgs.returnValue = false;
    //     }
    //     var isVisible = menu.style.visibility === "visible";
    //
    //     if (isVisible) {
    //         hide();
    //     } else {
    //         placeMenu(eventArgs);
    //         show();
    //     }
    // };
    // document.onclick = function () {
    //     hide();
    // };


    document.getElementById("scrollUp").addEventListener("click", function() {
        innerMenu.scrollTop -= menuItemHeight;
    });
    document.getElementById("scrollDown").addEventListener("click", function() {
        innerMenu.scrollTop += menuItemHeight;
    });
})();