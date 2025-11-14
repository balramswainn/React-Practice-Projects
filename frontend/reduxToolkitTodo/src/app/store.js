import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer
})


//configureStore kya hai?
//Ye Redux Toolkit ka helper function hai.Iska kaam hai store banana (jisme saari state + reducers store hote hai).Store is like a big container jaha sab data/state rakha jata hai.
// Redux store ek container hai jisme pura app ka state rakha hota hai.
// But store ko khud se ye nhi pata ki state kaise update hogi.
// 👉 Isliye store ko ek reducer function dena padta hai jo bataye ki action ke basis pe state kaise badlegi.

//configureStore me reducer kyu likhna padta hai?
//configureStore ko bolna padta hai:
//"Bhai, agar koi action aaye toh state update karne ke liye ye function (reducer) use karna."Store ban gaya ✅Uske andar ek rule hai → jab bhi action dispatch hoga, todoreducer chalega aur state update karega ✅

//reducer kya hai?
//Reducer = function jo state update karta hai based on action.So reducers = state update rules.

//todoreducer kyu import kiya?
//Tumne todoSlice banaya hoga (using createSlice).createSlice automatically ek reducer generate karta hai.Ab ye todoSlice.reducer hi tumne todoreducer naam se import kiya.todoreducer = rules for updating todo state.

//Store me object ke andar reducer kyu likha?
//Because ek project me multiple slices ho sakte hai (todo, user, auth, products etc.).Isliye configureStore ek object leta hai jisme tum alag-alag reducers add kar sakte ho:

// export const store = configureStore({
//   reducer: {
//     todo: todoreducer,  // todo state ke liye rules
//     user: userreducer,  // user state ke liye rules
//   }
// })

// Agar sirf ek reducer hai, toh directly likh sakte ho:
//  reducer: todoreducer      Chhote app me sirf ek reducer ho toh direct likh sakte ho.
//Bada app me multiple slices hote hai (todo, user, cart, auth).Tab tumko object form use karna padta hai:
//todo → key ban gayi state ka naam
//todoreducer → value jo us part of state ko update karegi


//Jab tum configureStore banate ho:Ye ek global store banata hai jisme state kuch aisa hota hai: state object
// {
//   todo: { todos: [...] },   // todoSlice ka state
//   user: { name: "", age: 0 } // userSlice ka state
// }