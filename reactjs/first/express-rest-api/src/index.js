import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseEntryItemList from './components/ExpenseEntryItemList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ExpenseEntryItemList />
    </React.StrictMode>
);

