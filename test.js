var bigScreenImg_iPhone7Button=document.getElementById("bigScreenImg_iPhone7Button");
var bigScreenImg_iPhone7=document.getElementById("bigScreenImg_iPhone7");

bigScreenImg_iPhone7Button.onclick=function(){
$(bigScreenImg_iPhone7).css({
    transition:"all 1s linear",
    transform:"scale(.9,.9)",
    height:"33rem"
});
}
