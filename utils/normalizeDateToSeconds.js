function normalizeDateToSeconds(date) {
  const d = new Date(date);
  d.setMilliseconds(0);
  return d;
}

module.exports = { normalizeDateToSeconds };
