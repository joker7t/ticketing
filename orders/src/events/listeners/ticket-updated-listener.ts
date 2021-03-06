import {
  TicketUpdatedEvent,
  Subjects,
  TicketCreatedEvent,
  Listener,
  NotFoundError,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = await Ticket.findByEvent({
      id,
      version,
    });
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
