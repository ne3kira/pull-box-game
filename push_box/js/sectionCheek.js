class SectionCheek extends Block{
    constructor(target){
        super()
        this.target = target
        this.key = []
        this.pventKey = {
            position: 'static',
            float : 'left',
            width : '180px',
            height : '120px',
            lineHeight : '200px',
            margin : '10px 0 0 10px',
            border : '1px solid transparent',
            background : 'url(./images/map.png) no-repeat center/cover',
            cursor : 'pointer'
        }
        this.renderBox()
    }   

    renderBox(){
        for(let i = 0,l = mapCon.length; i < l;i++){
            this.key[i] = this.create()
            this.key[i].textContent = mapCon[i].name
            this.render(this.pventKey,this.key[i])
            this.addTo(this.target,this.key[i])
        }
    }
}