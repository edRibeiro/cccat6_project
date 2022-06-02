import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  getTotal() {
    const total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal();
      return total;
    }, 0);
    return total;
  }
}
