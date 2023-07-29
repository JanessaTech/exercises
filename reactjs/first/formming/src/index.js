import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseForm from './components/ExpenseForm'
import ExpenseUnControlledForm from "./components/ExpenseUnControlledForm";
import FormikDemo from "./components/FormikDemo";

const controlledFrom = ReactDOM.createRoot(document.getElementById('controlledFrom'));
controlledFrom.render(
    <React.StrictMode>
        <ExpenseForm />
    </React.StrictMode>
);

const unControlledFrom = ReactDOM.createRoot(document.getElementById('unControlledFrom'));
unControlledFrom.render(
    <React.StrictMode>
        <ExpenseUnControlledForm />
    </React.StrictMode>
);

const formik = ReactDOM.createRoot(document.getElementById('formik'));
formik.render(
    <React.StrictMode>
        <FormikDemo />
    </React.StrictMode>
);