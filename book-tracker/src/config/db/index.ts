import mongoose from "mongoose";

export default class MongooseClient {

    public connect() {
        const uri: string = "mongodb://localhost:27017/book_traker_db"
         mongoose.connect(uri, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Connection established with mongodb ');
            }
        });
    };
}
