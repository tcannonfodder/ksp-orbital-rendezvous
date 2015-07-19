var Telemachus = Class.create({
  initialize: function(host, port){
    this.socket = new WebSocket("ws://"+ host +":"+port+"/datalink")
    this.socket.onmessage = this.dispatchMessages.bind(this)
    this.receiverFunctions = []
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    this.send({"+" : fields})
  },

  dispatchMessages: function(event){
    var data = JSON.parse(event.data)

    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      this.receiverFunctions[i](data)
    };

    console.log(data)
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  }
})