const {
  getStatusBadge,
  buildTimeline,
  formatDate,
  validatePayload
} = require('./test-utils'); // adjust path

describe('getStatusBadge()', () => {

  test('returns Pending badge', () => {
    expect(
      getStatusBadge('Pending')
    ).toBe(
      '<span class="badge badge-pending">Pending</span>'
    );
  });

  test('returns Resolved badge', () => {
    expect(
      getStatusBadge('Resolved')
    ).toContain('badge-resolved');
  });

  test('handles unknown status', () => {
    expect(
      getStatusBadge('Unknown')
    ).toBe(
      '<span class="badge ">Unknown</span>'
    );
  });

});


describe('formatDate()', () => {

  test('formats valid date', () => {
    const result = formatDate('2026-05-30');

    expect(result).toContain('2026');
  });

  test('returns dash for null', () => {
    expect(
      formatDate(null)
    ).toBe('—');
  });

  test('returns dash for invalid date', () => {
    expect(
      formatDate('abc123')
    ).toBe('—');
  });

});


describe('buildTimeline()', () => {

  test('creates Submitted timeline', () => {

    const complaint = {
      status: 'Submitted',
      created_at: '2026-05-01',
      updated_at: '2026-05-01'
    };

    const steps = buildTimeline(complaint);

    expect(steps.length).toBe(1);

    expect(steps[0].text)
      .toBe('Complaint Submitted');

  });


  test('creates In Progress timeline', () => {

    const complaint = {
      status: 'In Progress',
      created_at: '2026-05-01',
      updated_at: '2026-05-05'
    };

    const steps = buildTimeline(complaint);

    expect(steps.length).toBe(3);

    expect(
      steps.some(s => s.text === 'Work In Progress')
    ).toBe(true);

  });


  test('creates Resolved timeline', () => {

    const complaint = {
      status: 'Resolved',
      created_at: '2026-05-01',
      updated_at: '2026-05-10'
    };

    const steps = buildTimeline(complaint);

    expect(
      steps.some(s => s.text === 'Issue Resolved ✅')
    ).toBe(true);

  });


  test('creates Rejected timeline', () => {

    const complaint = {
      status: 'Rejected',
      created_at: '2026-05-01',
      updated_at: '2026-05-03'
    };

    const steps = buildTimeline(complaint);

    expect(
      steps.some(s => s.text === 'Complaint Rejected')
    ).toBe(true);

  });

});


describe('validatePayload()', () => {

  test('valid payload passes', () => {

    const data = {
      full_name: 'Sara Ahmed',
      email: 'sara@test.com',
      complaint_type: 'Water Supply',
      location: 'Lahore',
      title: 'Water Issue',
      description: 'Burst pipe'
    };

    expect(
      validatePayload(data)
    ).toEqual({
      valid: true,
      missing: []
    });

  });


  test('detects missing fields', () => {

    const data = {
      full_name: '',
      email: 'sara@test.com',
      complaint_type: '',
      location: 'Lahore',
      title: '',
      description: ''
    };

    const result = validatePayload(data);

    expect(result.valid).toBe(false);

    expect(result.missing).toContain('full_name');
    expect(result.missing).toContain('complaint_type');
    expect(result.missing).toContain('title');
    expect(result.missing).toContain('description');

  });


  test('rejects invalid email', () => {

    const data = {
      full_name: 'Sara Ahmed',
      email: 'invalid-email',
      complaint_type: 'Water Supply',
      location: 'Lahore',
      title: 'Water Issue',
      description: 'Burst pipe'
    };

    expect(
      validatePayload(data)
    ).toEqual({
      valid: false,
      missing: ['email (invalid format)']
    });

  });

});