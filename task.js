function hoverBar(){
    var sidebar = document.getElementById('sidebar');
    var hoverBtn = document.getElementById('hoverBar');
   
    if (sidebar.style.display === 'none'){
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }
}