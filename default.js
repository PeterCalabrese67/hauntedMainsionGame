const readline = require("readline");



const rooms = {
    foyer: {
      description: "You are standing in the foyer of the Haunted Mansion. The room is dimly lit and full of cobwebs. A grand staircase leads up to the second floor, and a hallway leads to the north.",
      items: ["candlestick"],
      exits: {
        north: "hallway"
      }
    },
    hallway: {
      description: "You are in a long hallway. The walls are lined with portraits of stern-looking men and women. There is a door to the south, and another door to the north.",
      exits: {
        south: "foyer",
        north: "library"
      }
    },
    library: {
      description: "You are in the library. The room is musty and smells of old books. There are rows of bookshelves lining the walls, and a large desk in the center of the room. On the desk, you see a thick, leather-bound book with strange symbols on the cover.",
      items: ["book"],
      exits: {
        south: "hallway"
      }
    }
  };

  // Define the game's characters
const characters = [
    { id: 0, name: "poltergeist", description: "A mischievous poltergeist.", room: 2 },
    { id: 1, name: "bride", description: "A ghostly bride.", room: 9 },
    { id: 2, name: "caretaker", description: "A grumpy caretaker.", room: 3 },
    { id: 3, name: "ghost", description: "A friendly but forgetful ghost.", room: 5 }
  ];
  
  // Define the objects
const objects = {
    candlestick: {
      name: "candlestick",
      description: "An old, rusty candlestick. It looks like it hasn't been used in years.",
      canPickUp: true
    },
    book: {
      name: "book",
      description: "A thick, leather-bound book with strange symbols on the cover. It's written in a language you don't recognize.",
      canPickUp: true
    }
  };
  
  // Define the player's inventory
  const inventory = [];
  
  // Define the current room
  let currentRoom = "foyer";
  
  // Show the current room
function showRoom() {
    console.log(rooms[currentRoom].description);
    if (rooms[currentRoom].items.length > 0) {
      console.log("You see the following items in the room:");
      rooms[currentRoom].items.forEach((item) => {
        console.log(objects[item].name);
      });
    }
  }
  function describeRoom(room) {
    //console.log(rooms[room].name);
    console.log(rooms[room].description);
    if (rooms[room].items.length > 0) {
      console.log("You see the following items in the room:");
      rooms[room].items.forEach((item) => {
        console.log(objects[item].name);
      });
    }

    const currentRoom = rooms[room];
   //const exits = [...currentRoom.exits.keys()].join(", ");
   const exits = Object.keys(currentRoom.exits).join(", ");
    //const exits = [...rooms[room].exits.keys()].join(", ");
    console.log(`Exits: ${exits}`);
  }

  function processCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const target = parts[1];
  
    if (!action) {
      console.log("I don't understand what you want me to do.");
    } else if (action === "look") {
      describeRoom(currentRoom);
    } else if (action === "go") {
      const newRoom = currentRoom.getExit(target);
      if (newRoom === null) {
        console.log("You can't go that way.");
      } else {
        currentRoom = newRoom;
        describeRoom(currentRoom);
      }
    } else {
      console.log("I don't know how to do that.");
    }
  }

  // Parse user input
  function parseInput(input) {
    console.log ("in parse");
    const command = input.trim().toLowerCase();
    const parts = command.split(' ');
    const verb = parts[0];
    const noun = parts.length > 1 ? parts[1] : '';
  
    switch (verb) {
      case "go":
        go(noun);
        break;
      case "look":
        look(noun);
        break;
      case "take":
        take(noun);
        break;
      case "inventory":
        showInventory();
        break;
      default:
        console.log("I'm sorry, I don't understand.");
      break;

    }
}  

// Move to another room
function go(direction) {
    const exit = rooms[currentRoom].exits[direction];
    if (exit) {
      currentRoom = exit;
      showRoom();
    } else {
      console.log("You can't go that way.");
    }
  }
  
  // Look at an object or the room
  function look(noun) {
    if (noun) {
      const item = objects[noun];
      if (item) {
        console.log(item.description);
      } else {
        console.log("You don't see that here.");
      }
    } else {
      showRoom();
    }
  }
  
  // Take an object
  function take(noun) {
    if (noun) {
      const item = objects[noun];
      if (item && item.canPickUp) {
        inventory.push(item);
        const index = rooms[currentRoom].items.indexOf(item.name);
      }
    }
}


/*
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    // Parse user input here
    console.log(`You entered: ${input}`);
  });
  
// Start the game
console.log("Welcome to the Haunted Mansion adventure game!");
showRoom();
rl.prompt();
*/
function main() {
  console.log("Welcome to the Haunted Mansion! You are standing in the foyer.");
  //describeRoom(currentRoom);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



  while (true) {
    describeRoom(currentRoom);
    
    rl.question("What do you want to do? ", answer => {
      const result = processCommand(answer);
      //room = result.room;
     // console.log(result.message);
    });
  }
 
}
//test commit
main();