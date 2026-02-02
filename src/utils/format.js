export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric',
  });
}

export function getCategoryColor(category) {
  const colors = {
    labor: '#3B82F6',
    materials: '#10B981',
    equipment: '#F59E0B',
    subcontractor: '#8B5CF6',
    transport: '#EC4899',
    other: '#6B7280',
  };
  return colors[category] || colors.other;
}

export function getStatusBadgeVariant(status) {
  const map = {
    'active': 'success',
    'completed': 'info',
    'on-hold': 'warning',
    'on-track': 'success',
    'over-budget': 'danger',
    'under-budget': 'info',
    'paid': 'success',
    'sent': 'info',
    'draft': 'default',
    'overdue': 'danger',
    'pending': 'warning',
    'approved': 'success',
    'received': 'info',
    'cancelled': 'danger',
    'verified': 'success',
    'in-progress': 'info',
  };
  return map[status] || 'default';
}

export function capitalize(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
