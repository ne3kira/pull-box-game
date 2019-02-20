class Menu extends Block{
    constructor(target){
        super()
        this.target = target
        this.key = []
        this.addTo(target)
        this.render({width : '100%', height : '100%',background : 'url(images/box.jpg) no-repeat center/120%'})
        this.pventKey = {
            position:'absolute',
            left : '50%',
            width : '200px',
            height : '50px',
            marginLeft : '-100px',
            lineHeight : '50px',
            cursor : 'pointer',
            borderRadius : '15px',
            backgroundColor : 'rgba(25, 233, 105, 0.5)',
            transition : '.2s'
        }
        this.getKey()
    }

    getKey(){
        let nameList = ['开始游戏','选择关卡','编辑地图']
        for(let i = 0,l = nameList.length; i < l;i++){
            this.pventKey.top = 300+i*60 + 'px'
            this.key[i] = this.create()
            this.key[i].textContent = nameList[i]
            this.render(this.pventKey,this.key[i])
            this.addTo(this.el,this.key[i])
        }
    }

    home(){
        this.pventKey.top = '420px'
        this.homeKey = this.create()
        this.homeKey.textContent = 'HOME'
        this.render({
            position:'absolute',
            zIndex : '999',
            right : '0px',
            width : '80px',
            height : '40px',
            lineHeight : '40px',
            cursor : 'pointer',
            backgroundColor : 'rgba(25, 233, 105, 0.3)',
            borderRadius : '15px',
        },this.homeKey)
        this.addTo(this.target,this.homeKey)
    }
}