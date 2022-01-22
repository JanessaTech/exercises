package com.example.state;

import lombok.ToString;

@ToString
public class StateC implements State{
    @Override
    public void handle(Context context) {
        context.setState(new StateA());
    }
}
