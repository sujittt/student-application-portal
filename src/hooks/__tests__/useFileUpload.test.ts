import { renderHook, act } from '@testing-library/react';
import { useFileUpload } from '../useFileUpload';
import { describe, it, expect } from 'vitest';

describe('useFileUpload', () => {
  it('should accept valid PDF file', () => {
    const { result } = renderHook(() => useFileUpload());

    const validPdf = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

    const uploadedFile = result.current.handleFileSelect(validPdf);

    expect(uploadedFile).not.toBeNull();
    if (uploadedFile) {
      expect(uploadedFile.name).toBe('test.pdf');
    }
    expect(result.current.uploadError).toBe('');
  });

  it('should reject non-PDF file', () => {
    const { result } = renderHook(() => useFileUpload());

    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

    let uploadedFile: ReturnType<typeof result.current.handleFileSelect> = null;
    act(() => {
      uploadedFile = result.current.handleFileSelect(invalidFile);
    });

    expect(uploadedFile).toBeNull();
    expect(result.current.uploadError).toBe('Only PDF files are allowed');
  });

  it('should reject files larger than 10MB', () => {
    const { result } = renderHook(() => useFileUpload());

    const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.pdf', {
      type: 'application/pdf',
    });

    let uploadedFile: ReturnType<typeof result.current.handleFileSelect> = null;
    act(() => {
      uploadedFile = result.current.handleFileSelect(largeFile);
    });

    expect(uploadedFile).toBeNull();
    expect(result.current.uploadError).toBe('File size must be less than 10MB');
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useFileUpload());

    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

    act(() => {
      result.current.handleFileSelect(invalidFile);
    });

    expect(result.current.uploadError).toBeTruthy();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.uploadError).toBe('');
  });

  it('should handle null file', () => {
    const { result } = renderHook(() => useFileUpload());

    let uploadedFile: ReturnType<typeof result.current.handleFileSelect> = null;
    act(() => {
      uploadedFile = result.current.handleFileSelect(null);
    });

    expect(uploadedFile).toBeNull();
    expect(result.current.uploadError).toBe('');
  });

  it('should format file size correctly', () => {
    const { result } = renderHook(() => useFileUpload());

    const smallFile = new File([new ArrayBuffer(500)], 'small.pdf', {
      type: 'application/pdf',
    });

    const uploadedFile = result.current.handleFileSelect(smallFile);

    expect(uploadedFile).not.toBeNull();
    if (uploadedFile) {
      expect(uploadedFile.size).toContain('KB');
    }
  });
});
