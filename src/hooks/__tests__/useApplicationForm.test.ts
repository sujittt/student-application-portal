import { renderHook, act } from '@testing-library/react';
import { useApplicationForm } from '../useApplicationForm';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useApplicationForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useApplicationForm());

    expect(result.current.currentStep).toBe(1);
    expect(result.current.totalSteps).toBe(4);
    expect(result.current.formData.personal.firstName).toBe('');
  });

  it('should update personal info', () => {
    const { result } = renderHook(() => useApplicationForm());

    act(() => {
      result.current.updatePersonalInfo({ firstName: 'John', lastName: 'Doe' });
    });

    expect(result.current.formData.personal.firstName).toBe('John');
    expect(result.current.formData.personal.lastName).toBe('Doe');
  });

  it('should validate and prevent navigation with incomplete data', () => {
    const { result } = renderHook(() => useApplicationForm());

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
  });

  it('should navigate to next step with valid data', () => {
    const { result } = renderHook(() => useApplicationForm());

    act(() => {
      result.current.updatePersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dateOfBirth: '2000-01-01',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      });
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(Object.keys(result.current.errors).length).toBe(0);
  });

  it('should navigate to previous step', () => {
    const { result } = renderHook(() => useApplicationForm());

    act(() => {
      result.current.updatePersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dateOfBirth: '2000-01-01',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      });
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);

    act(() => {
      result.current.previousStep();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('should calculate completeness percentage', () => {
    const { result } = renderHook(() => useApplicationForm());

    const initialCompleteness = result.current.calculateCompleteness();
    expect(initialCompleteness).toBe(0);

    act(() => {
      result.current.updatePersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      });
    });

    const updatedCompleteness = result.current.calculateCompleteness();
    expect(updatedCompleteness).toBeGreaterThan(initialCompleteness);
  });

  it('should validate percentage range', () => {
    const { result } = renderHook(() => useApplicationForm());

    // Fill personal info and move to step 2
    act(() => {
      result.current.updatePersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dateOfBirth: '2000-01-01',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      });
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);

    // Update with invalid percentage
    act(() => {
      result.current.updateAcademicInfo({
        class10School: 'Test School',
        class10Percentage: '150',
        class12School: 'Test School',
        class12Percentage: '90',
        major: 'Computer Science',
      });
    });

    // Try to move to next step - should fail validation
    act(() => {
      result.current.nextStep();
    });

    // Should stay on step 2 due to validation error
    expect(result.current.currentStep).toBe(2);
    expect(result.current.errors.class10Percentage).toBeDefined();
  });
});
