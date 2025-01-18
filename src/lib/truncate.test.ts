import { truncateText } from '@/lib';

describe('truncateText function', () => {
  it('should truncate the text to the specified length', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const truncatedText = truncateText(longText, 10);

    expect(truncatedText).toEqual('Lorem ipsu...');
  });

  it('should not truncate the text if it is shorter than the specified length', () => {
    const shortText = 'Short';
    const truncatedText = truncateText(shortText, 10);

    expect(truncatedText).toEqual('Short');
  });

  it('should handle empty text', () => {
    const emptyText = '';
    const truncatedText = truncateText(emptyText, 10);

    expect(truncatedText).toEqual('');
  });
});
