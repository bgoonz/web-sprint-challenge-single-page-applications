import React, { useState } from 'react';
import  * as yup from "yup";
import axios from 'axios';

// const reqUri = 'https://reqres.in/api/orders'
const pizzaSchema = yup.object ().shape ({
  name: yup
    .string ()
    .required ()
    .min (2, 'your name must have two characters or more'),
  size: yup.string ().required ().matches (/(small|medium|large)/),
  pepperoni: yup.bool (),
  sausage: yup.bool (),
  'canadian-bacon': yup.bool (),
  pineapple: yup.bool (),
  'special-order-instructions': yup.string (),
});

const defaultOrder = {
    name: "",
    size: "medium",
    pepperoni:false,
    sausage:false,
    "canadian-bacon":false,
    pineapple:false,
    "special-text": "ewwwww"
}



const PizzaForm = () => {
    const [curOrder, updateOrder] = useState(defaultOrder)
    const [error, setError] = useState()


    const submitClicked = (e) => {
        e.preDefault();
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
                    .catch((error) => console.error(error));}})
    }

    const updateOrder = (e) => {
        updateOrder({ ...curOrder, [e.target.name]: e.target.value })
    }

    const addTopping = (e) => {
        updateOrder(() => {
            return {...curOrder, [e.target.name]: !curOrder[e.target.name] }
        });
    }
    const handleSel = (e) => {
        updateOrder({ ...curOrder, [e.target.name]: e.target.value })
    }

    return (
        <form id='pizza-form'>
            <label>
                <b>Name:</b><br/>
                <input type="text" id='name-input' name="name" value={curOrder.name} onChange={updateOrder}></input>
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
                    <input onChange={addTopping} type='checkbox' checked={(curOrder.pepperoni === true)} name='pepperoni'></input>
                </label><br/>
                <label>
                    Sausage:
                    <input onChange={addTopping} type='checkbox' checked={curOrder.sausage === true} name='sausage'></input>
                </label><br/>
                <label>
                    Canadian Bacon:
                    <input onChange={addTopping} type='checkbox' checked={curOrder['canadian-bacon'] === true} name='canadian-bacon'></input>
                </label><br/>
                <label>
                    Pineapple:
                    <input onChange={addTopping} type='checkbox' checked={curOrder.pineapple === true} name='pineapple'></input>
                </label><br/>
            </label>
            <label>
                <b>Special Instructions</b>:<br/>
                <input name="special-text" type="text" value={curOrder['special-order-instructions']} onChange={updateOrder} id="special-text"/><br/>
            </label>
            <b style={{color: 'red'}}>{error}<br/></b>
            <button id='order-button' onClick={submitClicked}>Submit Order</button>
        </form>
    );
}

export default PizzaForm;
