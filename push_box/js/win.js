class Win extends Block{
    constructor(pos){
        super()
        this.pos = pos
        this.pvent['background'] = 'url(./images/win_point.png) no-repeat center'
        this.render(this.pvent)
        this.renderPos()
        this.pventKey = {
            position:'absolute',
            left : '50%',
            bottom : '120px',
            width : '200px',
            height : '50px',
            marginLeft : '-100px',
            lineHeight : '50px',
            cursor : 'pointer',
            borderRadius : '10px',
            backgroundColor : '#f60',
        }
    }

    winPoint(el){
        this.winSec = this.create()
        this.render({
            width : '100%',
            height : '100%',
            backgroundColor : '#fff4',
        },this.winSec)
        this.addTo(el,this.winSec)
        this.next()
        this.text()
    }

    text(){
        this.text = this.create()
        this.render({
            position:'absolute',
            top : '100px',
            width : '100%',
            height : '100px',
            fontSize : '70px',
            textAlign : 'center'
        },this.text)
        this.text.textContent = 'WIN Point!'
        this.addTo(this.winSec,this.text)
    }

    next(){
        this.nextBtn = this.create()
        this.render(this.pventKey,this.nextBtn)
        this.nextBtn.textContent = '下一关'
        this.addTo(this.winSec,this.nextBtn)
    }

    gameData(len, time){
        this.data = this.create()
        this.render({
            position:'absolute',
            top : '220px',
            width : '100%',
            height : '50px',
            textAlign : 'center',
            lineHeight : '50px',
            color : '#333'
        },this.data)
        this.data.textContent = `您一共行走了 ${len} 步，耗时 ${time} 秒！`
        this.addTo(this.winSec,this.data)
    }
}