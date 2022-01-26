const {response} = require('express')
const Event = require ('../models/Event');


const getEvents = async (req, res=response)=>{

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok:true,
        events
    })
}

const createEvent = async (req, res=response)=>{

    const event = new Event (req.body);

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok:true,
            evento: savedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'hable con un admin'
        })
    }
    
}

const updateEvent = async (req, res=response)=>{

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById(eventoId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'no existe ese evento'
            })
        }

        if (event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'no tiene privilegio para hacer esta actualizacion'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.json({
            ok:true,
            evento: eventoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el admin'
        })
    }
}

const deleteEvent = async (req, res=response)=>{

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById(eventoId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'no existe ese evento'
            })
        }

        if (event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'no tiene privilegio para hacer esta accion'
            })
        }

        await Event.findByIdAndDelete(eventoId);

        res.json({
            ok:true,
            msg: 'Evento borrado exitosamente'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el admin'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}