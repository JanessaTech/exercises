package com.example.iterator;

public class Client {
    public static void main(String[] args) {
        Aggregator<Person> agg = new ConcreteAggregator<>();
        agg.add(new Person("juan", 10));
        agg.add(new Person("wei", 13));
        agg.add(new Person("lulu", 8));

        Iterator<Person> it = agg.getIterator();
        while (it.hasNext()) {
            Person person = it.next();
            System.out.println(person);
        }

    }
}
