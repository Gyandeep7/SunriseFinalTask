import express from 'express'

const app=express()
const PORT=7154

app.listen(PORT, ()=>{
    console.log('server is runing')
})