class History{
    constructor(){
        this.historyList = []
        this.jsonDown = false
    }

    addHistory(map){
        let json = JSON.parse(JSON.stringify(map.json))

        if(this.jsonDown) {
            if(json.person[0].x===this.jsonDown.person[0].x && json.person[0].y===this.jsonDown.person[0].y) return
        }

        this.historyList.push(json)

        this.jsonDown = JSON.parse(JSON.stringify(json))
    }

    removeHistory(){
        if(this.historyList.length === 1) return
        this.historyList.pop()
    }

    getHistory(){
        this.jsonDown = false
        return this.historyList[this.historyList.length-1]
    }
}