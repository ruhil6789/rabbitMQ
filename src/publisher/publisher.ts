import ampq,{Connection, Message} from "amqplib/callback_api"

import { ConfigType } from "../configs"

const createMQProducer=async(config:ConfigType)=>{

    console.log("Connecting to RabbitMQ");
    let ch :any

    const queue= config.AUTH_TO_USER_QUEUE

    ampq.connect(config.AMQP_URL,(errorConnect:Error,connection:Connection)=>{
        if(errorConnect){
         console.log('Error Connecting to RabbitMQ',errorConnect);
         return
         
        }
        connection.createChannel((errorChannel,channel)=>{
            if(errorChannel){
                console.log("Error creating channel",errorChannel);
                
            }
            ch =channel
            console.log("connecting to rabbitMQ");
            
        })
    })
    return (msg:string)=>{
        console.log("Producing message to rabbitMQ....");
        ch.sendToQueue(queue, Buffer.from(msg))
        
    }
       
}

export default createMQProducer