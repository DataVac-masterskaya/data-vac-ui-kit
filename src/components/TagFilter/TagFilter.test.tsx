import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TagFilter } from './TagFilter';

describe('TagFilter', () => {
  const tags = ['Все', 'Национальный календарь', 'Сверх календаря', 'Другие'];

  it('renders all tags', () => {
    render(
      <TagFilter
        tags={tags}
        active={null}
        onChange={() => {}}
      />
    );

    tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('calls onChange with tag when clicking on inactive tag', async () => {
    const onChange = vi.fn();
    render(
      <TagFilter
        tags={tags}
        active={null}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByText('Все'));
    expect(onChange).toHaveBeenCalledWith('Все');
  });

  it('calls onChange with new tag when switching from another active tag', async () => {
    const onChange = vi.fn();
    render(
      <TagFilter
        tags={tags}
        active="Все"
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByText('Все'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('does not call onChange when clicking on tag if already selected?', async () => {
    const onChange = vi.fn();
    render(
      <TagFilter
        tags={tags}
        active="Все"
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByText('Национальный календарь'));
    expect(onChange).toHaveBeenCalledWith('Национальный календарь');
  });

  it('renders with active tag having aria-pressed=true', () => {
    render(
      <TagFilter
        tags={tags}
        active="Все"
        onChange={() => {}}
      />
    );

    const activeButton = screen.getByText('Все');
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders with inactive tags having aria-pressed=false', () => {
    render(
      <TagFilter
        tags={tags}
        active="Все"
        onChange={() => {}}
      />
    );

    const inactiveButton = screen.getByText('Национальный календарь');
    expect(inactiveButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders highlighted tags with pink color', () => {
    render(
      <TagFilter
        tags={tags}
        active={null}
        onChange={() => {}}
        highlighted={['Сверх календаря']}
      />
    );

    const highlightedTag = screen.getByText('Сверх календаря');
    expect(highlightedTag).toHaveClass('text-[#E30C5C]');
  });
});