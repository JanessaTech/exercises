import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseEntryItem from "./components/ExpenseEntryItem";
//import HelloWorld from './components/HelloWorld';
import ExpenseEntryItemList from './components/ExpenseEntryItemList'
import MessageWithEvent from './components/MessageWithEvent'
import ExpenseEntryItemListFn from "./components/ExpenseEntryItemListFn";
import RichTextMessage from "./components/RichTextMessage";
import Pager from "./components/Pager";

function Greeting() {
    var cTime = new Date().toTimeString()
    return <div>Current time is {cTime}</div>
}
/*
ReactDOM.render(
    <Greeting/>,
    document.getElementById('root')
);*/
var cTime = new Date().toTimeString();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div><p>The current time(1) is {cTime}</p></div>
);

function GetItems() {
    return (
        <div>
            <div><b>Item:</b> <em>Mango Juice</em></div>
            <div><b>Amount:</b> <em>20.00</em></div>
            <div><b>Spend Date:</b> <em>2020-10-10</em></div>
            <div><b>Category:</b> <em>Food</em></div>
        </div>
    );
}
const name = "Grape Juice"
const amount = 40.00
const spendDate = new Date("2020-10-10")
const category = "Food"

const item = {
    id: 1,
    name : "Grape Juice",
    amount : 30.5,
    spendDate: new Date("2020-10-10"),
    category: "Food"
}
/*
ReactDOM.render(
    <React.StrictMode>
        <ExpenseEntryItem
            name={name}
            amount={amount}
            spendDate={spendDate}
            category={category}
        />
    </React.StrictMode>,
    document.getElementById("item")
);*/
const item1 = ReactDOM.createRoot(document.getElementById("item"));
item1.render(
    <React.StrictMode>
        <ExpenseEntryItem data={item}/>
    </React.StrictMode>
);
const fun_item = ReactDOM.createRoot(document.getElementById("fun_item"));
fun_item.render(
    <React.StrictMode>
    <GetItems/>
    </React.StrictMode>
);

const items = [
    { id: 1, name: "Pizza", amount: 80, spendDate: "2020-10-10", category: "Food" },
    { id: 2, name: "Grape Juice", amount: 30, spendDate: "2020-10-12", category: "Food" },
    { id: 3, name: "Cinema", amount: 210, spendDate: "2020-10-16", category: "Entertainment" },
    { id: 4, name: "Java Programming book", amount: 242, spendDate: "2020-10-15", category: "Academic" },
    { id: 5, name: "Mango Juice", amount: 35, spendDate: "2020-10-16", category: "Food" },
    { id: 6, name: "Dress", amount: 2000, spendDate: "2020-10-25", category: "Cloth" },
    { id: 7, name: "Tour", amount: 2555, spendDate: "2020-10-29", category: "Entertainment" },
    { id: 8, name: "Meals", amount: 300, spendDate: "2020-10-30", category: "Food" },
    { id: 9, name: "Mobile", amount: 3500, spendDate: "2020-11-02", category: "Gadgets" },
    { id: 10, name: "Exam Fees", amount: 1245, spendDate: "2020-11-04", category: "Academic" }
]
const itemList = ReactDOM.createRoot(document.getElementById("itemList"));
itemList.render(
    <React.StrictMode>
        <ExpenseEntryItemList items={items}/>
    </React.StrictMode>
);

const event = ReactDOM.createRoot(document.getElementById("event"));
event.render(
    <React.StrictMode>
        <div>
            <MessageWithEvent name="React" />
            <MessageWithEvent name="React developer" />
        </div>
    </React.StrictMode>
);

const ItemListFn = ReactDOM.createRoot(document.getElementById("ItemListFn"));
ItemListFn.render(
    <React.StrictMode>
        <ExpenseEntryItemListFn  items={items} />
    </React.StrictMode>
);


const Containment = ReactDOM.createRoot(document.getElementById("Containment"));
Containment.render(
    <React.StrictMode>
        <RichTextMessage>
            <h1>Containment is really a cool feature.</h1>
        </RichTextMessage>
    </React.StrictMode>
);

const pageCount = 3;
const itemListPage = ReactDOM.createRoot(document.getElementById("itemListPage"));
itemListPage.render(
    <React.StrictMode>
        <Pager
            items={items}
            pageCount={pageCount}
            render={
                pagerState => (<div>
                    <ExpenseEntryItemList items={pagerState.items}
                                          onDelete={pagerState.deleteHandler} />
                </div>)
            }
        />
    </React.StrictMode>
);