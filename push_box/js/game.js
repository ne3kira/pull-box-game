class Game{
    constructor(ele){
        this.ele = document.querySelector(ele)
        this.init()
        this.section1()
        this.reduce = false
        this.keyPath = {
            arrowup : {x : 0, y : -1},
            arrowdown : {x : 0, y : 1},
            arrowleft : {x : -1, y : 0},
            arrowright : {x : 1, y : 0},
        }

        this.secBtn = ['wall', 'box', 'win', 'person']
    }
    
    init(){
        document.addEventListener('contextmenu',(e)=> {
            e.preventDefault()
        })
    }

    empty(){
        this.ele.textContent = ''
        this.menu.home()

        this.menu.homeKey.onclick = ()=>{
            this.ele.textContent = ''
            this.section1()
            this.ele.removeEventListener('click',this.foo)
            window.removeEventListener('keydown',this.fooEnter)
        }
    }

    // 主菜单
    section1(){
        this.menu = new Menu(this.ele)

        for(let i of this.menu.key){
            i.onmouseenter = function(){
                i.style.transform = 'scale(1.1)'
            }
            i.onmouseleave = function(){
                i.style.transform = 'scale(1)'
            }
        }

        this.menu.el.addEventListener('click',(e)=>{
            if(e.target === this.menu.key[0]){
                this.num = 0
                this.section3()
            } else if(e.target === this.menu.key[1]){
                this.section2()
            } else if(e.target === this.menu.key[2]){
                this.section5()
            }
        })
    }

    // 选择关卡
    section2(){
        this.empty()
        this.ele.style.background = '' 
        this.sectionCheek = new SectionCheek(this.ele)
        for(let i in this.sectionCheek.key){
            let btn = this.sectionCheek.key[i]
            btn.onclick = ()=> {
                this.num = i
                this.section3()
            }

            btn.onmouseenter = () => btn.style.borderColor = '#333'
            btn.onmouseleave = () => btn.style.borderColor = 'transparent'
        }
    }

    section3(){
        this.empty()
        this.time = new Date()
        this.ele.style.background = 'url(images/land.png) center/60px 60px' 
        this.map = new Map(mapCon[this.num])
        this.map.addTo(this.ele)

        this.history = new History()
        this.history.addHistory(this.map)

        this.setEvent()
    }

    // 胜利场景
    section4(){
        this.time = Math.floor((new Date() - this.time)/1000)

        this.map.win[0].winPoint(this.ele)
        this.map.win[0].gameData(this.history.historyList.length-1,this.time)
        
        window.removeEventListener('keydown', this.fooKey)
        window.removeEventListener('keydown', this.fooHistory)

        this.map.win[0].nextBtn.onclick = () => {
            this.num++
            if(this.num >= mapCon.length){
                this.num = 0
                this.section1()
            } else {
                this.section3()
            }
            
        }
    }

    // 编辑地图
    section5(){
        this.empty()
        this.ele.style.overflow = 'visible'
        this.ele.style.background = 'url(images/land.png) center/60px 60px' 

        this.sectionBox = new SectionBox(this.ele)
        setTimeout(()=>this.setEventSecFive())
    }

    setEvent(){
        this.fooKey = (e)=>{
            if(this.reduce) return
            this.reduce = true
            setTimeout(()=>{this.reduce = false}, 100)

            // e.preventDefault()
            let keyJson = this.keyPath[e.key.toLocaleLowerCase()]
            if(keyJson) {
                this.map.move(keyJson)

                this.history.addHistory(this.map)
            }
            if(this.map.isWin){
                this.section4()
            }
        }

        window.addEventListener('keydown', this.fooKey)

        // 后悔键
        window.removeEventListener('keydown', this.fooHistory)

        this.fooHistory = (e)=>{
            if(e.code.toLocaleLowerCase() === 'space') {
                this.history.removeHistory()

                this.map.historPos(this.history.getHistory())
            }
        }
        window.addEventListener('keydown', this.fooHistory)
    }

    setEventSecFive(){
        this.editType = 'wall'

        this.mapArr = {
            name : '自定义地图',
            person : [],
            box : [],
            wall : [],
            win : []
        }

        this.foo = (e) => {
            for(let i in this.sectionBox.key){
                if(e.target === this.sectionBox.key[i]) return
            }
            // 这里是点击删除某个盒子
            if(e.target.id !== 'game') {
                this.ele.removeChild(e.target)
                let str = `{"x":${this.strSplice(e.target.style.left)/60},"y":${this.strSplice(e.target.style.top)/60}}`
                let reg = eval('/'+str+']/')
                
                if(reg.test(JSON.stringify(this.mapArr))){
                    this.mapArr = JSON.stringify(this.mapArr).replace(eval('/,?'+str+'/'),'')
                }else{
                    this.mapArr = JSON.stringify(this.mapArr).replace(str+',','')
                }

                this.mapArr = JSON.parse(this.mapArr)
                return
            }

            let pos = {x:Math.floor(e.offsetX/60), y:Math.floor(e.offsetY/60)}

            this.personalJson = {
                name : '自定义地图',
                person : [],
                box : [],
                wall : [],
                win : []
            }
            this.personalJson[this.editType].push(pos)
            this.mapArr[this.editType].push(pos)
            this.map = new Map(this.personalJson)
            this.map.addTo(this.ele)
        }
        
        this.ele.addEventListener('click',this.foo)

        let index = this.sectionBox.key[0]
        index.classList.add('on')
        for(let i in this.sectionBox.key){
            this.sectionBox.key[i].onclick = () => {
                if (index === this.sectionBox.key[i]) return
                this.sectionBox.key[i].classList.add('on')
                this.editType = this.secBtn[i]
                index.classList.remove('on')
                index = this.sectionBox.key[i]
            }
        }

        this.fooEnter = (e)=>{
            if(e.code.toLocaleLowerCase() === 'enter' || e.code.toLocaleLowerCase() === 'numpadenter'){
                this.mapArr.name = prompt('是否保存，保存后您可以在HOME >>> 选择关卡里面找到它们')
                this.addMaps()
                this.ele.removeEventListener('click',this.foo)
                window.removeEventListener('keydown',this.fooEnter)
                this.section1()
            }
        }
        window.addEventListener('keydown',this.fooEnter)
    }
    
    strSplice(str){
        return window.Number(str.substr(0, str.length-2))
    }

    addMaps(){
        mapCon.push(this.mapArr)
    }
}