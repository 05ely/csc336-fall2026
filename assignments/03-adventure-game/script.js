let roomRootDiv = document.querySelector("#roomRoot");
let gameChoicesDiv = document.querySelector("#gameChoices");
let hasKey = false;

let rooms = {
    beginning: {
        name: "Start of the Game",
        description: "Welcome to the start of the game! You find yourself lost in the forest. Nearby, a small stream babbles, and the taste the sea salt clings to the air. You notice a few of the surrounding trees harbor deep gashes. You cannot shake the feeling that something is watching you.",
        linkedRooms: [
            { label: "Follow the smell of sea salt", destination: "beach" },
            { label: "Follow the noise of the stream", destination: "stream" },
            { label: "Follow the marked trees", destination: "path" }
        ]
    },
    forest:{
        name: "The Forest",
        description: "You head back into the forest, uncertain. Nearby, a small stream babbles, and the taste the sea salt clings to the air. A few of the surrounding trees harbor deep gashes. Something is watching you.",
        linkedRooms: [
            { label: "Follow the smell of sea salt", destination: "beach" },
            { label: "Follow the noise of the stream", destination: "stream" },
            { label: "Follow the marked trees", destination: "path" }
        ]
    },
    stream:{
        name: "The Stream",
        description: "Would you like to go upstream or downstream.",
        linkedRooms: [
            { label: "Go upstream", destination: "waterfall" },
            { label: "Go downstream", destination: "beach" },
            { label: "Back to the forest", destination: "forest" }
        ]
    },
    waterfall:{
        name: "The Waterfall",
        description: "TBD",
        linkedRooms: [
            { label: "Go back to where you came", destination: "stream" }
        ]
    },
    beach:{
        name: "The Beach",
        description: "TBD",
        linkedRooms: [
            { label: "Walk towards the water", destination: "shore" },
            { label: "Walk towards the headland", destination: "rocks" },
            { label: "Go back into the forest", destination: "forest" }
        ]
    },
    shore:{
        name: "The Shore",
        description: "TBD",
        linkedRooms: [
            { label: "Head back towards land", destination: "beach" }
        ]
    },
    rocks:{
        name: "The Rocks",
        description: "TBD",
        linkedRooms: [
            { label: "Enter the cave", destination: "cave" },
            { label: "Head back to the open sand", destination: "beach" },
        ]
    },
    cave:{
        name: "The Cave",
        description: "Inside, you find a key.",
        linkedRooms: [
            { label: "Happily leave the cave", destination: "rocks" }
        ]
    },
    path:{
        name: "Following the Path",
        description: "You notice a wearied castle in the distance. You think you see a figure flash in the window, but the builing looks too wilted to be housing any guests. Do you approach, or turn back?",
        linkedRooms: [
            { label: "Approach the doors", destination: "castle" },
            { label: "Are you dumb? I'm not entering a haunted castle.", destination: "forest" },
        ]
    },
    castle:{
        name: "The Abandoned Castle",
        description: "You approach the castle. Do you dare knock on the door?",
        linkedRooms: [
            { label: "I'm not scared of ghosts!", destination: "door" },
            { label: "I change my mind! I can't do this!", destination: "path" },
        ]
    },
    door:{
        name: "Castle Door",
        description: "The Door does not unlock. You need a Key. \n The hairs on you neck raise. You are being watched.",
        linkedRooms: [
            { label: "I need to find shelter.", destination: "path" }
        ]
    },
    win:{
        name: "Safety",
        description: "You made it into the castle!",
        linkedRooms: [
            { label: "Play again.", destination: "beginning" }
        ]
    }
}

let currentRoom = rooms["beginning"];

function goToRoom(roomKey) {
    if (!rooms[roomKey]) {
        console.error("No room called: " + roomKey);
        return;
    }

    if (roomKey === "beginning") {
        hasKey = false;
    }

    if (roomKey === "cave") {
        hasKey = true;
    }

    if (roomKey === "door" && hasKey) {
        roomKey = "win";
    }

    currentRoom = rooms[roomKey];
    visualizeRoom(currentRoom);
}

function visualizeRoom(room) {
    roomRootDiv.innerHTML = "";
    gameChoicesDiv.innerHTML = "";

    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = room.name;
    roomRootDiv.append(roomTitle);

    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = room.description;
    roomRootDiv.append(descriptionP);

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let exit = room.linkedRooms[i];
        let navButton = document.createElement("button");
        navButton.innerHTML = exit.label;
        navButton.addEventListener("click", function () {
            goToRoom(exit.destination);
        });
        gameChoicesDiv.append(navButton);
    }
}

visualizeRoom(currentRoom);