export type Status = 'created' | 'payment_started' | 'paid'

export const translateStatuses = (status: Status) => {
  const translated = {
    created: 'Created',
    payment_started: 'Payment started',
    paid: 'Paid',
  }

  return translated[status]
}
