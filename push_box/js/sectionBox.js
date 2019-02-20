class SectionBox extends Block{
    constructor(target){
        super()
        this.target = target
        this.key = []
        this.pventKey = {
            position:'absolute',
            right : '-80px',
            width : '80px',
            height : '40px',
            lineHeight : '40px',
            backgroundColor : 'rgba(25, 233, 105, 0.5)',
            cursor : 'pointer',
            transition : '.2s'
        }
        this.getKey()
    }

    getKey(){
        let secList = ['砖墙','箱子','终点','力士']
        for(let i = 0,l = secList.length; i < l;i++){
            this.pventKey.top = 50+i*50 + 'px'
            this.key[i] = this.create()
            this.key[i].textContent = secList[i]
            this.render(this.pventKey,this.key[i])
            this.addTo(this.target,this.key[i])
        }
    }
}