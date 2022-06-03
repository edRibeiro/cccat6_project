import { isComputedPropertyName, isTemplateExpression } from "typescript";
import Coupon from "../src/Coupon";
import Dimension from "../src/Dimension";
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

test("Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)", function () {
  const order = new Order("935.411.347-80");
  order.addItem(new Item(1, "Gitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(4872);
});

test("Deve criar um pedido com cupom de desconto expirado", function () {
  const order = new Order("935.411.347-80", new Date("2021-03-10T10:00:00"));
	order.addItem(new Item(1, "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Cabo", 30), 3);
	order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00")));
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 items e calcular o frete", function () {
  const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
	order.addItem(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20), 1);
	order.addItem(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
	const freight = order.getFreight();
	const total = order.getTotal();
  
  expect(freight).toBe(260);
	expect(total).toBe(6090);
});
