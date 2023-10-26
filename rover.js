const Message = require('./message.js');
const Command = require('./command.js');

// class Rover {
//    constructor(position) {
//       this.position = position;
//       this.mode = "NORMAL";
//       this.generatorWatts = 110;
//    }

//    receiveMessage(message) {
//       let results = [];
//       for (let command of message.commands) {
//          let result = {};

//          if (this.mode === "LOW_POWER") {
//             result = { completed: false };
//          } else if (command.commandType === "MOVE") {
//             if (this.mode === "LOW_POWER") {
//                result = { completed: false };
//             } else {
//                this.position = command.value;
//                result = { completed: true };
//             }
//          } else if (command.commandType === "STATUS_CHECK") {
//             // roverStatus = {
//             //    mode: this.mode,
//             //    generatorWatts: this.generatorWatts,
//             //    position: this.position,
//             // };
//             // result = { completed: true };
//             result = {
//                completed: true,
//                roverStatus: {
//                   mode: this.mode,
//                   generatorWatts: this.generatorWatts,
//                   position: this.position,
//                },
//             };

//          } else if (command.commandType === "MODE_CHANGE") {
//             this.mode = command.value;
//             result = { completed: true };
//          }

//          results.push(result);
//       }

//       let response = {
//          message: message.name,
//          results: results,
//        roverStatus: roverStatus,
//       }

//       return response;

//    }
// }
class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];

      for (let command of message.commands) {
         let result = {};

         if (command.commandType === "MOVE") {
            if (this.mode === "LOW_POWER") {
               result = { completed: false };
            } else {
               this.position = command.value;
               result = { completed: true };
            }
         } else if (command.commandType === "STATUS_CHECK") {
            result = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               },
            };
         } else if (command.commandType === "MODE_CHANGE") {
            this.mode = command.value;
            result = { completed: true };
         } else {
            this.mode = "LOW_POWER";
            result = { completed: false };
         }

         results.push(result);
      }

      let response = {
         message: message.name,
         results: results,
      };

      return response;
   }
}



let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);

 

module.exports = Rover;