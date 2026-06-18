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

  it('should prioritize disabled over active when letter is both active and disabled', () => {
    const onChange = vi.fn();
    render(
      <AlphabetFilter
        letters={['А', 'Б']}
        active="А"
        disabled={['А']}
        onChange={onChange}
      />
    );

    const letterA = screen.getByText('А');
    expect(letterA).toBeDisabled();
    expect(letterA).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(letterA);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders language toggle when language and onLanguageChange are provided', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
        language="ru"
        onLanguageChange={() => {}}
      />
    );

    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('does not render language toggle when language is not provided', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
      />
    );

    expect(screen.queryByText('RU')).not.toBeInTheDocument();
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('does not render language toggle when onLanguageChange is not provided', () => {
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
        language="ru"
      />
    );

    expect(screen.queryByText('RU')).not.toBeInTheDocument();
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('calls onLanguageChange when clicking on language button', async () => {
    const onLanguageChange = vi.fn();
    render(
      <AlphabetFilter
        letters={letters}
        active={null}
        onChange={() => {}}
        language="ru"
        onLanguageChange={onLanguageChange}
      />
    );

    await userEvent.click(screen.getByText('EN'));
    expect(onLanguageChange).toHaveBeenCalledWith('en');

    await userEvent.click(screen.getByText('RU'));
    expect(onLanguageChange).toHaveBeenCalledWith('ru');
  });
});
