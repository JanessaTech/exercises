import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloWorld from './HelloWorld';

test('test scenario 1', () => {
    render(<HelloWorld />);
    const element = screen.getByText(/Hello World/i);
    expect(element).toBeInTheDocument();
});