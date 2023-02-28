import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('intial state', () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  expect(checkBox).not.toBeChecked();
})

test('Checkbox disables button on first click and enables on second', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkBox);
  expect(confirmButton).toBeDisabled();

});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopOver = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopOver).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popOver).not.toBeInTheDocument();

})

