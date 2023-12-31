import { PlaceOrder } from "@/application/usecase/place_order/PlaceOrder";
import { DatabaseRepositoryFactory } from "../factory/DatabaseRepositoryFactory";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { Broker } from "../broker/Broker";

export class PlaceOrderController{

    constructor(readonly repositoryFactory:RepositoryFactory,readonly broker:Broker){

    }

    async execute(params:any,body:any){
        const placeOrder = new PlaceOrder(this.repositoryFactory,this.broker);
        const input = body
        input.date = new Date(input.date)
        return await placeOrder.execute(input);
    }
}