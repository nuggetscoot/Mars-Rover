const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    rover = new Message('Test message with two commands', "MOVE")
    expect(rover.name).toBe('Test message with two commands');
  });

  it("response received by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    rover = new Message('Test message with two commands', commands)
    expect(commands.length).toEqual(2);
  });

  it("responds correctly to the status check command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let response = rover.receiveMessage(message);

    let statusCheckResult = response.results[0];
    
    statusCheckResult.roverStatus = {
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 98382
    };
    expect(statusCheckResult).toEqual({
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382
    }  
  
  });
});


  it("responds correctly to the mode change command", function() {
    let rover = new Rover(98382)
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('Test message with one command', commands);

    expect(rover.mode).toBe("NORMAL");
    const response = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attemping to move in LOW_POWER mode", function() {
    let rover = new Rover(98382)
    rover.mode = 'LOW_POWER'
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with one command', commands);
    let response = rover.receiveMessage(message);
    expect(rover.position).toBe(98382);
  });

  it("responds with the position for the move command", function() {
  let rover = new Rover(98382)
  rover.position = 777777
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test message with one command', commands);
  let response = rover.receiveMessage(message);
  expect(rover.position).toBe(777777);
  
});
});


