class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }

//  let commandA = new Command("Move", "1000");
//  console.log(commandA);
 
//Command types are MODE_CHANGE, MOVE, AND STATUS_CHECK. Mode change can take value of LOW_POWER or NORMAL. MOVE takes value of new position.


 
 module.exports = Command;

 //