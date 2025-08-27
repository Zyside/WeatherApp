import { render, screen, fireEvent } from '@testing-library/react';
import { UnitToggle } from './UnitToggle';

test('toggles unit and is accessible', () => {
  const onChange = jest.fn();
  render(<UnitToggle unit="C" onChange={onChange} />);
  const group = screen.getByRole('group', { name: /units/i });
  expect(group).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '°F' }));
  expect(onChange).toHaveBeenCalledWith('F');
});
