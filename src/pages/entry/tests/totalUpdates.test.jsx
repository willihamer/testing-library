import { render, screen } from '../../../test-utils/testing-library-utils.test'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

test('updatescoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //  make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("scoops total: $", {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla", });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent("2.00");


  // update chocolate scoops to 1 and check subtotal
  const chocolateInput = await screen.findAllByRole('spinbutton', { name: "Chocolate", });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent("6.00");

});