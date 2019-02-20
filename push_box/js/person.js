class Person extends Block{
    constructor(pos){
        super()
        this.pos = pos || {x : 1, y : 1}
        this.direction = "bottom"
        this.pvent['background'] = 'url(./images/player_bottom.png) no-repeat center/42px 60px'
        this.render(this.pvent)
        this.renderPos()
    }

    changeDirection(pos){
        if(pos.x === 1){
            this.direction = 'right'
            return
        }
        if(pos.x === -1){
            this.direction = 'left'
            return
        }
        if(pos.y === 1){
            this.direction = 'bottom'
            return
        }
        if(pos.y === -1){
            this.direction = 'top'
        }
    }

    turn(pos){
        this.changeDirection(pos)
        this.move(pos)
        this.el.style.background = `url(./images/player_${this.direction}.png) no-repeat center/42px 60px` 
    }
}