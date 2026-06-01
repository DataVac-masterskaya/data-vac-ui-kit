import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AlphabetFilter } from './AlphabetFilter';

describe('AlphabetFilter', () => {
  const letters = ['А', 'Б', 'В', 'Г'];

  it('renders all letters', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
      />
    );

    letters.forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it('calls onChange with letter when clicking on inactive letter', async () => {
    const onChange = vi.fn();
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByText('Б'));
    expect(onChange).toHaveBeenCalledWith('Б');
  });

  it('calls onChange with null when clicking on active letter (deselect)', async () => {
    const onChange = vi.fn();
    render(
      <AlphabetFilter
        letters={letters}
        active="Б"
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByText('Б'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('does not call onChange when clicking on disabled letter', async () => {
    const onChange = vi.fn();
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={onChange}
        disabled={['В']}
      />
    );

    const disabledButton = screen.getByText('В');
    await userEvent.click(disabledButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders disabled letter with disabled attribute', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
        disabled={['В']}
      />
    );

    const disabledButton = screen.getByText('В');
    expect(disabledButton).toBeDisabled();
  });

  it('renders active letter with aria-pressed=true', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active="Б"
        onChange={() => {}}
      />
    );

    const activeButton = screen.getByText('Б');
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
  });
});
