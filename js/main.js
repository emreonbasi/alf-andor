
var ul = document.getElementById("player-list-ul");
var url = "https://api.minetools.eu/query/payidar.rabisu.net/25845";

function getStatus() {

    

    $.getJSON(url, function(r) {
        while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    //data is the JSON string
    if (r.error) {
    $('#rest').html('Sunucu Kapalı');
    $('#player-button').css('visibility', "hidden");
    return false;
    }

    $('#rest').html(r.Motd + '<br><b>Aktif Oyuncu:</b> ' + r.Players);

    if (r.Playerlist.length === 0) {
    $('#player-button').css('visibility', "hidden");
    return false;
    }

    
    let playerListUl = $('#player-list-ul');

    if (window.matchMedia('(max-width: 768px)').matches && !window.matchMedia('(max-width: 468px)').matches) {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 4 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(4, auto)');
    }

    else if (window.matchMedia('(max-width: 468px)').matches) {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 2 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(2, auto)');
    }

    else {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 6 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(6, auto)');
    }
    
    for(let i = 0; i < r.Playerlist.length;i++) {
    let listItem = document.createElement("li");
    listItem.textContent = r.Playerlist[i];
        
        if(r.Playerlist[i] === "Esmanur067") {
            listItem.textContent = r.Playerlist[i] + " (Admin)";
            listItem.style.color = "#ff80d5";
            listItem.style.fontSize = "2rem"
        }
        else if(r.Playerlist[i] === "Alf") {
            listItem.textContent = r.Playerlist[i] + " (Usta)"
            listItem.style.color = "#c8e953";
            listItem.style.fontSize = "2rem"
        }
        else if(r.Playerlist[i] === "eric") {
            listItem.textContent = r.Playerlist[i] + " (Çırak)"
            listItem.style.color = "#c8e953";
            listItem.style.fontSize = "2rem"
        }
        
    
    ul.appendChild(listItem);
    }
    

});  
}
function playerList() {
    let element = $(".player-list")
    if(element.css("visibility") === "hidden") {
        element.css("visibility","visible")
    }
    else{
        element.css("visibility", "hidden") 
    }
    
    
}
    
function swipeNavbar(){
let navBarIcon = $('#nav-icon');
let navBarMover = $('.navbarMover');
let navBar = $('.navbar');
let isNavbarTouched = false;
let startTouchY;
let startMoverHeight;
let startNavbarHeight;
let navbarOpen = false;
document.addEventListener('touchstart' ,e=>{
    if((!navbarOpen && e.touches[0].clientY <= 150) || (navbarOpen && e.touches[0].clientY <= 280)){
        isNavbarTouched = true; 
        startTouchY = e.touches[0].clientY;
        startMoverHeight = Number(navBarMover.css('height').replace('px',''));
        startNavbarHeight = Number(navBar.css('height').replace('px',''));
    }
});

document.addEventListener('touchmove',e=>{
    if(!isNavbarTouched) return false;
    e.preventDefault();
    let touchY = e.touches[0].clientY;
    if(touchY - startTouchY <= 145 && touchY < 280){
        let movementRange = (touchY - startTouchY) / 145;
            
        let navbarMoverHeight = `${startMoverHeight + movementRange * 130}px`;
        let NavbarHeight = `${startNavbarHeight + movementRange * 130}px`;
        navBarMover.css('height',navbarMoverHeight);
        navBar.css('height',NavbarHeight );
    }
},{passive:false});

document.addEventListener('touchend', e=>{
    if(isNavbarTouched) {
        let navbarHeight = Number(navBar.css('height').replace('px',''));
        if(navbarHeight >= 215){
            navBarIcon.removeClass('fa-chevron-down');
            navBarIcon.addClass('fa-chevron-up');
            navbarOpen = true;
        }
        else{
            navbarOpen = false;
            navBarIcon.removeClass('fa-chevron-up');
            navBarIcon.addClass('fa-chevron-down');
        }
        navBar.css('height', navbarHeight < 215 ? '150px' : '280px');
        navBarMover.css('height',navbarHeight < 215 ? '50px' : '180px')
        isNavbarTouched = false;
    }
});

}

function blockRightClick(){

    var isNS = (navigator.appName == "Netscape") ? 1 : 0;
    var EnableRightClick = 0;
    if(isNS)
    document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
    function mischandler(){
    if(EnableRightClick==1){ return true; }
    else {return false; }
    }
    function mousehandler(e){
    if(EnableRightClick==1){ return true; }
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if((eventbutton==2)||(eventbutton==3)) return false;
    }
    function keyhandler(e) {
    var myevent = (isNS) ? e : window.event;
    if (myevent.keyCode==96)
    EnableRightClick = 1;
    return;
    }
    document.oncontextmenu = mischandler;
    document.onkeypress = keyhandler;
    document.onmousedown = mousehandler;
    document.onmouseup = mousehandler;

    language="JavaScript1.2"> 
    function disableselect(e){ return false } 
    function reEnable(){ return true } document.onselectstart=new 
    Function ("return false") 
    if (window.sidebar){ document.onmousedown=disableselect 
    document.onclick=reEnable }
}


getStatus(); 
setInterval(getStatus,5000);
blockRightClick();
swipeNavbar();
            
        