/*
    Events Route
    /api/events
*/

const { Router } = require("express");
const {check} = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { renewToken } = require("../middlewares/renewToken");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use(renewToken);

// obtener eventos
router.get('/' ,getEvents);

// crear un nuevo evento
router.post('/',
    [
        check('title' , 'El titulo es Obligatorio').not().isEmpty(),
        check('start' , 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        validarCampos
    ] ,
    createEvent
);

// actualizar un evento
router.put('/:id' ,updateEvent);

// borrar evento
router.delete('/:id' ,deleteEvent);

module.exports = router;