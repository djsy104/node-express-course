const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("greet", (name) => console.log("Hello", name));
setInterval(() => {
  customEmitter.emit("greet", "Dj");
}, 2000);
