import { isTemplateExpression } from "typescript";
import Item from "../src/Item";
import Order from "../src/Order";

test("Não deve criar um pedido com CPF inválido", function () {
    expect(() => new Order("111.111.111-11")).toThrow(new Error("CPF Inválido"));
});

test("Deve criar um pedido com 3 items (com descrição, preço e quantidade)", function () {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Gitarra", 1000), 1);
    order.addItem(new Item(2, "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
});