const tab= document.querySelector('.tabs');
const items= tab.querySelectorAll('.tab');
const arrowIcons= document.querySelectorAll('.icon span');
const { clientWidth, scrollWidth }= tab;

function addClass(elm,name){
    elm.classList.add(name);
}
function removeClass(elm,name){
    elm.classList.remove(name)
}
function updateIconVisibility(scrolledWidth){
    arrowIcons[0].parentElement.classList.toggle('hide', scrolledWidth<=1);
    arrowIcons[1].parentElement.classList.toggle('hide', scrollWidth - (clientWidth + scrolledWidth)<=1);
}
function scrollToElm(elm){
    elm.scrollIntoView({
        inline: 'center',

    })
}
items.forEach( item => {
    item.addEventListener('click',() => {
        const activeTab= tab.querySelector('.active');
        if(activeTab){
            removeClass(activeTab,'active');
        }
        addClass(item,'active');
        scrollToElm(item);
    })
})
tab.addEventListener('scroll', (e) => {
    updateIconVisibility(e.target.scrollLeft);
})
tab.addEventListener('wheel', (e) => {
    tab.style.scrollBehavior= 'auto';
    tab.scrollLeft += e.deltaY;
});
arrowIcons.forEach( icon => {
    icon.addEventListener('click', () =>{
        tab.style.scrollBehavior= 'smooth';
        tab.scrollLeft+= icon.classList.contains('right-arrow') 
            ? 200
            : icon.classList.contains('left-arrow')
                ? -200
                : 0;    
    })       
})