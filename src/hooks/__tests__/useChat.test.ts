import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useChat', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with a welcome message', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe('assistant');
    expect(result.current.messages[0].content).toContain('Hello');
  });

  it('should send user message', async () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('How do I apply?');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].role).toBe('user');
    expect(result.current.messages[1].content).toBe('How do I apply?');
  });

  it('should show typing indicator when sending message', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Test question');
    });

    expect(result.current.isTyping).toBe(true);
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].role).toBe('user');
    expect(result.current.messages[1].content).toBe('Test question');
  });

  it('should not send empty messages', () => {
    const { result } = renderHook(() => useChat());

    const initialLength = result.current.messages.length;

    act(() => {
      result.current.sendMessage('   ');
    });

    expect(result.current.messages).toHaveLength(initialLength);
  });

  it('should update input value', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInputValue('Test input');
    });

    expect(result.current.inputValue).toBe('Test input');
  });

  it('should clear input after sending message', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInputValue('Test message');
    });

    expect(result.current.inputValue).toBe('Test message');

    act(() => {
      result.current.sendMessage(result.current.inputValue);
    });

    expect(result.current.inputValue).toBe('');
  });
});
