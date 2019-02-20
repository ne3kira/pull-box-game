class Block{
    constructor(){
        this.el = document.createElement('div')
        this.pvent = {
            'width': '60px',
            'height': '60px',
        }
    }

    render(pvent,target = this.el){
        Object.assign(target.style, pvent)
    }

    create(div = 'div'){
        return document.createElement(div)
    }

    // 计算盒子当前位置
    move(keyJson){
        this.pos.x += keyJson.x
        this.pos.y += keyJson.y
        this.renderPos()
    }

    // 渲染盒子的位置
    renderPos(pos){
        if(pos) this.pos = pos
        this.el.style.left = this.pos.x*60 + 'px'
        this.el.style.top = this.pos.y*60 + 'px'
    }

    addTo(traget,keys = this.el){
        traget.appendChild(keys)
    }
}