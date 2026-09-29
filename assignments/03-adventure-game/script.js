let roomRootDiv = document.querySelector("#roomRoot");
let gameChoicesDiv = document.querySelector("#gameChoices");
let invRootDiv = document.querySelector("#invRoot");
let inventory = [];

let rooms = {
    beginning: {
        name: "Start of the Game",
        description: "Welcome to the start of the game! You find yourself lost in the forest. Nearby, a small stream babbles, and the taste the sea salt clings to the air. You notice a few of the surrounding trees harbor deep gashes.<br>You cannot shake the feeling that something is watching you.",
        linkedRooms: [
            { label: "Follow the smell of sea salt", destination: "beach" },
            { label: "Follow the noise of the stream", destination: "stream" },
            { label: "Follow the marked trees", destination: "path" }
        ]
    },
    forest:{
        name: "The Forest",
        description: "You head back into the forest, uncertain. Nearby, a small stream babbles, and the taste the sea salt clings to the air. A few of the surrounding trees harbor deep gashes.<br>Something is watching you.",
        linkedRooms: [
            { label: "Follow the smell of sea salt", destination: "beach" },
            { label: "Follow the noise of the stream", destination: "stream" },
            { label: "Follow the marked trees", destination: "path" }
        ]
    },
    stream:{
        name: "The Stream",
        description: "You follow your ears, happening upon a small, but steady, stream. You can't remember if a stream is meant to be here, but yet here exists one regardless. You notice the forest is eerily quiet, aside from the tumbling water in front of you.<br>You decide to...",
        linkedRooms: [
            { label: "Go upstream", destination: "waterfall" },
            { label: "Go downstream", destination: "beach" },
            { label: "Head back to the forest", destination: "forest" }
        ]
    },
    waterfall:{
        name: "The Waterfall",
        description: "As you walk upstream, the deafening sound of a waterfall encompasses you. You wonder if you can get to higher ground, but the surrounding area is too slick to climb. The mud deters you from going any further.",
        linkedRooms: [
            { label: "Go back to where you came", destination: "stream" }
        ]
    },
    beach:{
        name: "The Beach",
        description: "The salty breesze carries you towards the beach. Though you wish you could stop to soak in the sun, you have more pressing matters to attend to. Like being lost.",
        linkedRooms: [
            { label: "Walk towards the water", destination: "shore" },
            { label: "Walk towards the headland", destination: "rocks" },
            { label: "Go back into the forest", destination: "forest" }
        ]
    },
    shore:{
        name: "The Shore",
        description: "You step into the water, but don't see any fish to catch. It's hard to focus. <br> When do fishes go to the eye doctor? When they have trouble sea-ing. <br><br> haha <br><br> You might be going crazy.",
        linkedRooms: [
            { label: "That was a dumb joke. I want to leave.", destination: "beach" }
        ]
    },
    rocks:{
        name: "The Rocks",
        description: "You walk along the large rocky outcrop, noticing the entrance to a cave in it's side. You wonder if there could be any useful items inside.",
        linkedRooms: [
            { label: "Bears don't live on the beach. I'll be fine.", destination: "cave" },
            { label: "Are you serious? I'm not getting mauled today.", destination: "beach" },
        ]
    },
    cave:{
        name: "The Cave",
        description: "Wow! Inside, you find a key.",
        linkedRooms: [
            { label: "Happily leave the cave!", destination: "rocks" }
        ]
    },
    path:{
        name: "Following the Path",
        description: "You notice a wearied castle in the distance. You think you see a figure flash in the window, but the builing looks too wilted to be housing any guests.<br>Do you approach, or turn back?",
        linkedRooms: [
            { label: "Approach the castle", destination: "castle" },
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
        description: "The Door does not unlock. You need a Key.<br>The hairs on you neck raise. You are being watched.",
        linkedRooms: [
            { label: "Turn back.", destination: "path" }
        ]
    },
    win:{
        name: "Safety",
        description: "You made it safely into the castle, and live to see another day! Congrats!",
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
        inventory = [];
    }

    if (roomKey === "cave" && !inventory.includes("Key")) {
        inventory.push("Key");
    }

    if (roomKey === "door" && inventory.includes("Key")) {
        roomKey = "win";
    }

    currentRoom = rooms[roomKey];
    visualizeRoom(currentRoom);
}

function visualizeInventory() {
    invRootDiv.innerHTML = "";

    let invTitle = document.createElement("h3");
    invTitle.innerHTML = "Inventory";
    invRootDiv.append(invTitle);

    if (inventory.length === 0) {
        let empty = document.createElement("hp");
        empty.innerHTML = "Nothing";
        invRootDiv.append(empty);
        return;
    }

    for (let i = 0; i < inventory.length; i++) {
        let item = document.createElement("p");
        item.innerHTML = inventory[i];
        invRootDiv.append(item);
    }
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

    visualizeInventory();
}

visualizeRoom(currentRoom);