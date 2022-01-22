package com.example.memento;

public class Client {
    public static void main(String[] args) {
        VM vm = new VM("S0");
        vm.setState("S1");
        History history = new History();
        Snapshot snapshot = vm.takeSnapshot();
        history.setSnapshot(snapshot);
        vm.setState("S2");
        vm.setState("S3");
        vm.restore(history.getSnapshot());


    }
}
