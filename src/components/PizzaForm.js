import React, { useState } from 'react';
import  * as yup from "yup";
import axios from 'axios';

const reqUri = 'https://reqres.in/api/orders'

const initialPizza = {
    name: "",
    size: "medium",
    pepperoni:false,
    sausage:false,
    "canadian-bacon":false,
    pineapple:false,
    "special-text": ""
}

const pizzaSchema = yup.object().shape({
    name: yup.string().required().min(2, "name must be at least 2 characters"),
    size: yup.string().required().matches(/(small|medium|large)/),
    pepperoni: yup.bool(),
    sausage: yup.bool(),
    "canadian-bacon": yup.bool(),
    pineapple: yup.bool(),
    "special-text": yup.string(),
})


const PizzaForm = () => {
    const [curOrder, setCurOrder] = useState(initialPizza)
    const [error, setError] = useState()


    const submitClicked = (event) => {
        event.preventDefault();
        setError();
        pizzaSchema.validate(curOrder)
        .catch(e => {
            console.error(e.errors);
            setError(e.errors[0]);
            console.log(e.errors.length)
            return(e.errors)
        }).then((errlist) => {
            if (!Array.isArray(errlist)) {
                console.log('Calling axios with list:\n', curOrder)
                axios.post("https://reqres.in/api/orders", curOrder)
                    .then(response => console.log('Response:', response))
                    .catch(err => console.error(err));}})
    }

    const updateValue = (event) => {
        setCurOrder({ ...curOrder, [event.target.name]: event.target.value })
    }

    const toggleTopping = (event) => {
        setCurOrder(() => {
            return {...curOrder, [event.target.name]: !curOrder[event.target.name] }
        });
    }
    const handleSel = (event) => {
        setCurOrder({ ...curOrder, [event.target.name]: event.target.value })
    }

    return (
        <form id='pizza-form'>
            <label>
                <b>Name:</b><br/>
                <input type="text" id='name-input' name="name" value={curOrder.name} onChange={updateValue}></input>
            </label><br/>
            <label>
                <b>Size:</b><br/>
                <select id='size-dropdown' name="size" value={curOrder.size} onChange={handleSel}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </label><br/>
            <label>
                <b>Toppings:</b><br/>
                <label>
                    Pepperoni:
                    <input onChange={toggleTopping} type='checkbox' checked={(curOrder.pepperoni === true)} name='pepperoni'></input>
                </label><br/>
                <label>
                    Sausage:
                    <input onChange={toggleTopping} type='checkbox' checked={curOrder.sausage === true} name='sausage'></input>
                </label><br/>
                <label>
                    Canadian Bacon:
                    <input onChange={toggleTopping} type='checkbox' checked={curOrder['canadian-bacon'] === true} name='canadian-bacon'></input>
                </label><br/>
                <label>
                    Pineapple:
                    <input onChange={toggleTopping} type='checkbox' checked={curOrder.pineapple === true} name='pineapple'></input>
                </label><br/>
            </label>
            <label>
                <b>Special Instructions</b>:<br/>
                <input name="special-text" type="text" value={curOrder['special-text']} onChange={updateValue} id="special-text"/><br/>
            </label>
            <b style={{color: 'red'}}>{error}<br/></b>
            <button id='order-button' onClick={submitClicked}>Submit Order</button>
        </form>
    );
}

export default PizzaForm;