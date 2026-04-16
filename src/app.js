const express=require('express')

const app=express()
app.use(express.json())

let notes=[]

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:'Post Successful'
    })
})

app.get('/notes',(req,res)=>{

    let result;
    let status=req.query.status;
    if(status){
        result=notes.filter(e => e.status=== status)
    }
    else{
        result=notes
    }
    res.status(200).json({
        message:'Get data successfull',
        notes:result
    })
})

app.delete('/notes/:id',(req,res)=>{
    let index=req.params.id
    if(!notes[index]){
        res.status(404).json({
            message:'Not found '
        })
    }
    delete notes.splice(index,1)
    res.status(200).json({
        message:'Successful delete data'
    })
})

app.patch('/notes/:id',(req,res)=>{
    let index=req.params.id;
     if(!notes[index]){
        res.status(404).json({
            message:'Not found '
        })
    }
    // let title=req.body.title
    let description=req.body.description
    let status=req.body.status
    let createdAt=req.body.createdAt
    // notes[index].title=title
    notes[index].description=description
    notes[index].status=status
    notes[index].createdAt=createdAt

    res.status(200).json({
        message:'Successful update data'
    })
})



