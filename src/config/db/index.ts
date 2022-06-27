import mongoose from "mongoose";

export default class MongooseClient {

    public connect(uri: string) {
         mongoose.connect(uri, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Connection established with mongodb ');
            }
        });
    };
    public disconnect(){
        mongoose.connection.close();
    }
}
