class Wall extends Block{
    constructor(pos){
        super()
        this.pos = pos
        this.pvent['background'] = 'url(./images/wall.png) no-repeat center/60px 60px'
        this.render(this.pvent)
        this.renderPos()
    }
}