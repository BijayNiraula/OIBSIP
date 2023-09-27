import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

const dbURI = process.env.DB_URI;

const connectDb = async () => {

    const connectionOptions: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions

    try {
        if (!dbURI) {
            console.log("Db url is undefined")
            return;
        }
        await mongoose.connect(dbURI, connectionOptions)
        console.log("database connection successfull")
    } catch (e) {
        console.log("could not able to connect to the database");
    }


}

export default connectDb;