const cols = document.querySelectorAll('.col')
document.addEventListener('keydown',function(e){
    e.preventDefault()
    if(e.code.toLowerCase() === 'space'){
        setRandomColors()
    }
})
let generateRandomColor=()=>{
    let hexCodes='0123456789ABCDEF'
    let color =''
    for(let i =0;i<6;i++){
        color += hexCodes[Math.floor(Math.random() * (hexCodes.length))]
    }
    return '#' + color 
}
document.addEventListener('click',event =>{
    const type = event.target.dataset.type
    if(type === 'lock'){
        
        const node =event.target.tagName.toLowerCase() === 'i' ? event.target
        :event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }else if(type === 'copy'){
        copyToClickBoard(event.target.textContent)
    }
    
})

let copyToClickBoard = (text) =>{
    return navigator.clipboard.writeText(text)
}
let setRandomColors = (isInitial) =>{
    const colors=isInitial ? getColorsfromHash() : []
    cols.forEach((col,index)=> {
        
        const isLocked =col.querySelector('i').classList.contains('fa-lock')
        const textCol = col.firstElementChild
       const button =col.lastElementChild
       

        if(isLocked){
            colors.push(textCol.textContent)
            return 
        }
        const color =isInitial ? colors[index] 
                                ?colors[index]
                                :chroma.random() :chroma.random()
        if(!isInitial){
            colors.push(color) 
        }
        
       textCol.textContent=color
       col.style.background=color
       

       setTextColor(textCol,color)
       setTextColor(button,color)
    
    });
    updateColorsHash(colors)
}


let setTextColor = (text,color) =>{
    const luminance = chroma(color).luminance()
    text.style.color=luminance > 0.5 ? 'black' : 'white'
}
let updateColorsHash=(colors=[]) =>{
    document.location.hash =colors.map(col =>{
        console.log(col)
        return col.toString().substring(1)
        
    }).join('-')
}
let clickOnMobile = () =>{
    let WidthOfPage= document.body.clientWidth
    if(WidthOfPage < 500){
        document.addEventListener('click',function(){
            setRandomColors()
        })
    }
}
clickOnMobile()
let getColorsfromHash = () =>{
    if(document.location.hash.length >1){
        return document.location.hash
        .slice(1)
        .split('-')
        .map((color) => '#' +color)
    }
    return []
} 
setRandomColors(true)