import mongoose from "mongoose"

let mongoURI
if(process.env.NODE_ENV === "test"){
    mongoURI = process.env.URI_MONGODB_TESTS
}
else{
    mongoURI = process.env.URI_MONGODB
}

try{
    mongoose.connect(mongoURI)
    console.log("database conected")
} catch (error) {
    console.error("something went wrong while trying to connect with the database", error)
    process.exit(1) 
}

export default connectDatabase