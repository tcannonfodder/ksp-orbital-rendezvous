var Telemachus = Class.create({
  initialize: function(host, port){
    this.socket = new WebSocket("ws://"+ host +":"+port+"/datalink")
    this.socket.onmessage = this.dispatchMessages.bind(this)
    this.receiverFunctions = [],
    this.bodiesIndex = this.buildPlanetaryBodiesIndex()
    this.subscribedDataFields = []
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    this.subscribedDataFields += fields
    this.send({"+" : this.subscribedDataFields})
  },

  dispatchMessages: function(event){
    var data = JSON.parse(event.data)
    // debugger
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      this.receiverFunctions[i](data)
    };

    console.log(data)
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  },

  getBodyId: function(name){
    return this.bodiesIndex[name]
  },

  buildPlanetaryBodiesIndex: function(){
    return {
      "Kerbol" : 0,
      "Kerbin" : 1,
      "Mun" : 2,
      "Minmus" : 3,
      "Moho" : 4,
      "Eve" : 5,
      "Duna" : 6,
      "Ike" : 7,
      "Jool" : 8,
      "Laythe" : 9,
      "Vall" : 10,
      "Bop" : 11,
      "Tylo" : 12,
      "Gilly" : 13,
      "Pol" : 14,
      "Dres" : 15,
      "Eeloo" : 16
    }
  }
})