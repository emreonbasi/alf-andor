var socket;
let isWsOpen = false;

function getStatus() {

    let ul = document.getElementById("player-list-ul");
    let url = "https://api.minetools.eu/query/payidar.rabisu.net/25845";

    // Siteye query gönder
    $.getJSON(url, function(r) { 
        // yeni gelen oyuncu listesini koymadan önce eski oyuncuları listeden sil
        while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    // Hata alınırsa sunucunun kapalı olduğunu yaz
    if (r.error) {
    $('#rest').html('Sunucu Kapalı');
    $('#player-button').css('visibility', "hidden");
    return false;
    }

    $('#rest').html(r.Motd + '<br><b>Aktif Oyuncu:</b> ' + r.Players);

    // Oyuncu yok ise AKtif oyuncular butonunu gizle
    if (r.Playerlist.length === 0) {
    $('#player-button').css('visibility', "hidden");
    return false;
    }


    let playerListUl = $('#player-list-ul');

    // 768px'den görüntüleniyorsa grid columnunu küçült
    if (window.matchMedia('(max-width: 768px)').matches && !window.matchMedia('(max-width: 468px)').matches) {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 4 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(4, auto)');
    }

    // 468px'den görüntüleniyorsa grid columnunu küçült
    else if (window.matchMedia('(max-width: 468px)').matches) {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 2 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(2, auto)');
    }

    else {
    playerListUl.css('grid-template-columns',r.Playerlist.length < 6 ? `repeat(${r.Playerlist.length},auto)` : 'repeat(6, auto)');
    }
    
    // gelen oyuncu listesindeki oyuncuların adını li elementi olarak ekle bazılarının yazılarını ve renklerini değiştir
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
        
    // oluşturulan li elementini ul nin altına ekle
    ul.appendChild(listItem);
    }
    

});  
}

// aktif oyuncular düğmesine basıldığında playerlisti aç kapa
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

// Ekrana dokunulduğunda dokunmanın y koordinatını ve oynatılacak elementlerin boyunu kaydet
document.addEventListener('touchstart' ,e=>{
    if((!navbarOpen && e.touches[0].clientY <= 150) || (navbarOpen && e.touches[0].clientY <= 280)){
        isNavbarTouched = true; // Dokunulan yer navbar
        startTouchY = e.touches[0].clientY;  // Dokunmaya nereden başlandı
        startMoverHeight = Number(navBarMover.css('height').replace('px',''));
        startNavbarHeight = Number(navBar.css('height').replace('px',''));  
    }
});

document.addEventListener('touchmove',e=>{
    if(!isNavbarTouched) return false;
    e.preventDefault(); // Navbara dokunuldu ise aşağı kaymayı önle
    let touchY = e.touches[0].clientY;
    if(touchY - startTouchY <= 145 && touchY < 280){ // Dokunma çok aşağıdaysa navbarı hareket ettirmemek için ve dokunma range ini belirlemek için
        let movementRange = (touchY - startTouchY) / 145; // Dokunma range ini 0 ile 1 arasında bir değer olarak al örn: 0.44651
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
            navBarIcon.removeClass('fa-chevron-up');
            navBarIcon.addClass('fa-chevron-down');
            navbarOpen = false;
        }
        navBar.css('height', navbarHeight < 215 ? '150px' : '280px'); // 215 px'den yukarıdaysa yukarıya değilse aşağı yapıştır
        navBarMover.css('height',navbarHeight < 215 ? '50px' : '180px') // 215 px'den yukarıdaysa yukarıya değilse aşağı yapıştır
        isNavbarTouched = false;
    }
});

}

function blockRightClick(){
    document.addEventListener('contextmenu', event => event.preventDefault());
}

function textAreaShowCharacter(){
    // TEXT AREA SHOW CHARACTER

$('textarea').keyup(function() {
    
    let characterCount = $(this).val().length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');
      
    current.text(characterCount);
   
    
    /*This isn't entirely necessary, just playin around*/
    if (characterCount < 70) {
      current.css('color', '#666');
    }
    if (characterCount > 70 && characterCount < 90) {
      current.css('color', '#6d5555');
    }
    if (characterCount > 90 && characterCount < 100) {
      current.css('color', '#793535');
    }
    if (characterCount > 100 && characterCount < 120) {
      current.css('color', '#841c1c');
    }
    if (characterCount > 120 && characterCount < 139) {
      current.css('color', '#8f0001');
    }
    
    if (characterCount >= 140) {
      maximum.css('color', '#8f0001');
      current.css('color', '#8f0001');
      theCount.css('font-weight','bold');
    } else {
      maximum.css('color','#666');
      theCount.css('font-weight','normal');
    }
    
        
  });
    
}


function initWebSocket(){
    let message = document.getElementById('mesaj').value;
    let name = document.getElementById('isim').value;
    if(!message || (!socket && !name)) {return;}


    if(!isWsOpen){

        socket = new WebSocket('wss://payidarsvstatus-production.up.railway.app');

        socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({name:name, type:'init',message:message}));
        isWsOpen = true;
        });
    
        socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
        });

        socket.addEventListener('close',()=>{
            isWsOpen = false;
        })
    }
    else{
        socket.send(JSON.stringify({type:'message',message:message}));
    }
}

getStatus(); 
setInterval(getStatus,5000);
blockRightClick();
swipeNavbar();
textAreaShowCharacter();
            


        