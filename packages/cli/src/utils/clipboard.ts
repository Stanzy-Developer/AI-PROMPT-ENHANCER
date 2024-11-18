import clipboardy from 'clipboardy';

export class ClipboardService {
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await clipboardy.write(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  static async readFromClipboard(): Promise<string | null> {
    try {
      return await clipboardy.read();
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      return null;
    }
  }
}
