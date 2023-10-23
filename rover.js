const Message = require("./message.js");
const Command = require('./command.js');

class Rover {
   constructor (position, mode = "NORMAL", generatorWatts = 110) {
      this.mode = mode;
      this.generatorWatts = generatorWatts;
      this.position = position;
   }
   receiveMessage(message) {
      let response = {
         message : message.name,
         results: []
      }
      for (let i = 0; i < message.commands.length; i ++) {        //iterate through commands of message
      let obj = {}                                          //object to be pushed into results array. each command should have individual object
      obj["completed"] = true;
      let command = message.commands[i];
      if (command.commandType === "STATUS_CHECK") {            //status check command
         let status = {mode : this.mode, generatorWatts: this.generatorWatts, position: this.position};
         obj["roverStatus"] = status;
         } else if (command.commandType === "MODE_CHANGE"){    //mode change command
            this.mode = command.value
         } else if (command.commandType === "MOVE"){           //move command
            if (this.mode === "LOW_POWER"){
               obj["completed"] = false;
            } else {
               this.position = command.value;
            }
         };         
         
      response.results.push(obj);
      };
      
      return response;
   }
}


// let rover = new Rover(1234);
// // console.log(rover);
// let testCommand = [new Command("STATUS_CHECK")];
// let testMessage = new Message("Test", testCommand);
// console.log(testCommand);
// console.log(testMessage);
// console.log(rover.receiveMessage(testMessage));


module.exports = Rover;


