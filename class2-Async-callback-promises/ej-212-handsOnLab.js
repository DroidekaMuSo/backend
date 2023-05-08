class TicketManager {
  #basePrice = 0.15;

  constructor() {
    this.events = [];
  }

  getEvents = () => {
    return this.events;
  };

  addEvent = (
    name,
    place,
    price,
    capacity,
    date = new Date().toLocaleDateString()
  ) => {
    const event = {
      name,
      place,
      price: price + price * this.#basePrice,
      capacity,
      date,
      participants: [],
    };

    if (this.events.length === 0) {
      event.id = 1;
    } else {
      event.id = this.events[this.events.length - 1].id + 1;
    }

    this.events.push(event);
  };

  addUser = (idEvent, idUser) => {
    const eventIndex = this.events.findIndex((event) => event.id === idEvent);
    if (eventIndex === -1) {
      console.log("Event not found");
      return;
    }

    const userRegistered =
      this.events[eventIndex].participants.includes(idUser);
    if (userRegistered) {
      console.log("User already registered");
      return;
    }
    this.events[eventIndex].participants.push(idUser);
  };

  putEvent = (idEvent, newLocation, newDate) => {
    const eventIndex = this.events.findIndex((event) => event.id === idEvent);

    if (eventIndex === -1) {
      console.log("Event not found");
      return;
    }

    const event = this.events[eventIndex];
    const newEvent = {
      ...event,
      place: newLocation,
      date: newDate,
      id: this.events[this.events.length - 1].id + 1,
      participants: [],
    };
    this.events.push(newEvent);
  };
}

const managingEvents = new TicketManager();

managingEvents.addEvent("Event 1", "Mexico", 200, 50);
managingEvents.addUser(1, 2);
managingEvents.putEvent(1, "Mexico", "30/11/2024");

console.log(managingEvents.getEvents());
