import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Button} from './Button';

// Test branch
describe('Button component', () => {
  it('should render button text correctly', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByText('Submit');

    expect(button).toBeInTheDocument();
  });


  it('should have correct button type', () => {
    render(<Button type="submit">Login</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });


  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled={true}>Save</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
