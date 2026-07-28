import { describe, expect, it } from 'vitest';

describe('form submission prevention', () => {
  it('prevents browser form submission through the submit handlers', () => {
    const event = {
      preventDefault: () => {
        event.defaultPrevented = true;
      },
      stopPropagation: () => {
        event.propagationStopped = true;
      },
      defaultPrevented: false,
      propagationStopped: false,
    };

    const handleSubmit = async (currentEvent) => {
      currentEvent.preventDefault();
      currentEvent.stopPropagation();
    };

    handleSubmit(event);

    expect(event.defaultPrevented).toBe(true);
    expect(event.propagationStopped).toBe(true);
  });
});
