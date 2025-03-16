import { connectDB } from './db/db.js';
import express, {Express} from 'express'

const clientDB=await connectDB(); //use this clientDB to interact with the database ()
export const collection=clientDB.db('Evaluation')
console.log('LETS GET IT !!')
const app=express()

//middleware to
app.use(express.json())
const port=process.env.PORT??8080

//needed by our infrastructure to detect your app
app.get('/health',(req,res)=>{
    res.status(200).send('OK')
})

app.listen(port,()=>console.log(`listening on port ${port}`))


export default app
/*
To run setup/install dependecies, paste these commands in the terminal:
- chmod +x setup.sh
- ./setup.sh
source ~/.bashrc  # For bash users
source ~/.zshrc   # For zsh users

*/