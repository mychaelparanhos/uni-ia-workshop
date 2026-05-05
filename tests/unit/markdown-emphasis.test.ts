import { describe, it, expect } from 'vitest';
import { em } from '../../src/lib/markdown-emphasis';

describe('em() — markdown emphasis helper', () => {
  it('converts single *word* to <em class="serif-mint">', () => {
    expect(em('foo *bar* baz')).toBe('foo <em class="serif-mint">bar</em> baz');
  });

  it('converts multiple emphases in same string', () => {
    expect(em('*one* and *two*')).toBe(
      '<em class="serif-mint">one</em> and <em class="serif-mint">two</em>'
    );
  });

  it('handles emphasis with spaces and punctuation', () => {
    expect(em('Salvei 200 posts. *De novo*.')).toBe(
      'Salvei 200 posts. <em class="serif-mint">De novo</em>.'
    );
  });

  it('returns string unchanged when no asterisks', () => {
    expect(em('plain text')).toBe('plain text');
  });

  it('handles empty string', () => {
    expect(em('')).toBe('');
  });

  it('handles unmatched single asterisk gracefully (no replace)', () => {
    expect(em('foo *bar baz')).toBe('foo *bar baz');
  });

  it('handles asterisk-wrapped phrase with multiple words', () => {
    expect(em('saiba que *aplicar é a virada*.')).toBe(
      'saiba que <em class="serif-mint">aplicar é a virada</em>.'
    );
  });
});
