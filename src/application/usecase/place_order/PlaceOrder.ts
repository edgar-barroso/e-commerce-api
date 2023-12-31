import { Order } from "@/domain/entity/Order";
import { ItemRepository } from "@/domain/repository/ItemRepository";
import { OrderRepository } from "@/domain/repository/OrderRepository";
import { CouponRepository } from "@/domain/repository/CouponRepository";
import { PlaceOrderOutput } from "./PlaceOrderOutput";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { DefaultFreightCalculator } from "@/domain/services/DefaultFreightCalculator";
import { OrderPlaced } from "@/domain/event/OrderPlaced";
import { Broker } from "@/infra/broker/Broker";

export class PlaceOrder {
  orderRepository: OrderRepository;
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  
  constructor(
    repositoryFactory:RepositoryFactory,readonly broker:Broker
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.itemRepository = repositoryFactory.createItemRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count() + 1

    const order = new Order(input.cpf, input.date,new DefaultFreightCalculator(),sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error("Item not Found");
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon){
        const coupon = await this.couponRepository.findByCode(input.coupon)
        if(coupon) order.addCoupon(coupon) 
    }
    await this.orderRepository.save(order);
    await this.broker.publish(new OrderPlaced(order))
    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(),total);
    return output;
  }
}
