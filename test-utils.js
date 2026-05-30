function getStatusBadge(s) {
  const map = {
    'Pending': 'badge-pending',
    'In Progress': 'badge-progress',
    'Resolved': 'badge-resolved',
    'Submitted': 'badge-submitted',
    'Under Review': 'badge-review',
    'Rejected': 'badge-rejected',
  };

  return `<span class="badge ${map[s] || ''}">${s}</span>`;
}

function buildTimeline(complaint) {
  const steps = [];

  const filed = formatDate(complaint.created_at);
  const updated = formatDate(complaint.updated_at);

  steps.push({
    dot: '#27ae60',
    text: 'Complaint Submitted',
    date: filed
  });

  if (
    ['Under Review', 'In Progress', 'Resolved', 'Rejected']
      .includes(complaint.status)
  ) {
    steps.push({
      dot: '#9b59b6',
      text: 'Received & Under Review',
      date: filed
    });
  }

  if (
    ['In Progress', 'Resolved']
      .includes(complaint.status)
  ) {
    steps.push({
      dot: '#e05a7a',
      text: 'Work In Progress',
      date: updated
    });
  }

  if (complaint.status === 'Resolved') {
    steps.push({
      dot: '#27ae60',
      text: 'Issue Resolved ✅',
      date: updated
    });
  }

  if (complaint.status === 'Rejected') {
    steps.push({
      dot: '#e74c3c',
      text: 'Complaint Rejected',
      date: updated
    });
  }

  return steps;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';

  const d = new Date(dateStr);

  if (isNaN(d.getTime())) {
    return '—';
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function validatePayload(data) {
  const required = [
    'full_name',
    'email',
    'complaint_type',
    'location',
    'title',
    'description'
  ];

  const missing = required.filter(
    field =>
      !data[field] ||
      data[field].toString().trim() === ''
  );

  if (missing.length > 0) {
    return {
      valid: false,
      missing
    };
  }

  const emailOK =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  if (!emailOK) {
    return {
      valid: false,
      missing: ['email (invalid format)']
    };
  }

  return {
    valid: true,
    missing: []
  };
}

module.exports = {
  getStatusBadge,
  buildTimeline,
  formatDate,
  validatePayload
};