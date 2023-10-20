const Command = require('./command.js');

class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error ("Message name required.")
      }
      this.commands = commands;
   }
}

// let moveCommand = new Command("MOVE", 1000);
// let statusCheckCommand = new Command("STATUS_CHECK");
// let testMessage = new Message("Test", [moveCommand, statusCheckCommand]);
// console.log(testMessage);

module.exports = Message;