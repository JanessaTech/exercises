package com.example.state;

import lombok.ToString;

@ToString
public class StateA implements State{
    @Override
    public void handle(Context context) {
        context.setState(new StateB());
    }
}
