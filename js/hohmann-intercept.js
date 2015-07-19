var HohmannIntercept = Class.create({
  initialize: function(datalink){
    this.datalink = datalink
    this.targetBody = {}
    this.vessel = {}

    this.datalink.addReceiverFunction(this.updateCalculations.bind(this))
  },

  updateCalculations: function(data){
    this.divideAltitude(data)
    this.calculateDeltaV1(data)
    this.calculatePhaseAngle(data)
  },

  divideAltitude: function(data){
    console.log(data['v.altitude'] + "/2 = " + data['v.altitude'] / 2.0);
  },

  calculateDeltaV1: function(data){
    var standdardGravity = 3531600010120;
    var r1 = data['o.PeA']
    var r2 = data['tar.o.PeA']
    var mu = standdardGravity

    var factor1 = Math.sqrt(mu/r1)
    var factor2 = Math.sqrt((2 * r2)/(r1 + r2))

    var deltaV1 = factor1 * (factor2 - 1)

    console.log("delta V1: " + deltaV1)
  },

  calculatePhaseAngle: function(data){
    var r1 = data['o.PeA']
    var r2 = data['tar.o.PeA']
    var radius = 600000
    var numberOfOrbits = Math.pow(0.5 * ( (r1 + r2 + (2*radius) )/((2*radius) + (2*r2)) ), 1.5)

    if(numberOfOrbits < 1){
      var fractionalPart = numberOfOrbits
    } else{
      var fractionalPart = (numberOfOrbits % 1)
    }

    var sweepAngle = 360 * fractionalPart
    var phaseAngle = 180 - sweepAngle

    var targetPhaseAngle = data["b.o.phaseAngle[2]"]

    console.log("Phase Angle: " + phaseAngle + " targetPhaseAngle: " + targetPhaseAngle)

    if(phaseAngle <= targetPhaseAngle + 30 && phaseAngle >= targetPhaseAngle - 30){
      console.log("FIRE EVERYTHING")
    }
  }
})