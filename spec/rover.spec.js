const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

beforeAll ( function () {
  moveCommand = new Command("MOVE", 1000);
  statusCheckCommand = new Command("STATUS_CHECK");
  lowPowerCommand = new Command("MODE_CHANGE", "LOW_POWER");
  normalCommand = new Command("MODE_CHANGE", "NORMAL");
  testRover = new Rover(1234);
});

describe("Rover class", function() {
  test("constructor sets position and default values for mode and generatorWatts", function() {
    expect(testRover.position).toBe(1234);
    expect(testRover.mode).toBe("NORMAL");
    expect(testRover.generatorWatts).toBe(110);
  });
  test("response returned by receiveMessage contains the name of the message", function() {
    let testMessage = new Message("Test Message", [statusCheckCommand, lowPowerCommand]);
    let response = testRover.receiveMessage(testMessage);
    expect(response.message).toEqual("Test Message");
  });
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let lowPowerMessage = new Message("Test Message", [lowPowerCommand, statusCheckCommand]);
    let response = testRover.receiveMessage(lowPowerMessage);
    expect(response.results).toHaveLength(2);
  });
  test("responds correctly to the status check command", function() {   //test 10
    let testTenRover = new Rover(1234);
    let statusCheckMessage = new Message("Status Check Test", [statusCheckCommand]);
    let response = testTenRover.receiveMessage(statusCheckMessage);
    let expected = {
      completed: true,
      roverStatus: {mode: "NORMAL", generatorWatts: 110, position: 1234}
    };
    expect(response.results[0]).toEqual(expected);
  });
    test("responds correctly to the mode change command", function() {         //test 11
      let testElevenRover = new Rover(1234);
      let lowPowerMessage = new Message("Mode change check", [lowPowerCommand, statusCheckCommand]);
      testElevenRover.receiveMessage(lowPowerMessage);
      expect(testElevenRover.mode).toBe("LOW_POWER");
    });
    
  });
