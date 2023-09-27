import cors,{CorsOptions} from "cors"

const corsOptions:CorsOptions={
    origin:[process.env.FRONTENT_BASE_URL as string ,"https://razorpay.com/"],
    methods:'GET,POST,PUT,DELETE',
    credentials:true

}
const corsMiddleware=cors(corsOptions)
export default corsMiddleware;