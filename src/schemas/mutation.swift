mutation {
  createInvoice(input: {
    client: "CLIENT_ID",  # Replace CLIENT_ID with the actual client ID
    invoiceNumber: 196,
    issueDate: "2023-01-01T00:00:00.000Z",
    dueDate: "2023-01-15T00:00:00.000Z",
    startOfWeek: "2023-01-01T00:00:00.000Z",
    days: {
      monday: {
        date: "2023-01-02",
        hours: 8,
        shifts: [{
          start: "2023-01-02T09:00:00.000Z",
          end: "2023-01-02T17:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      tuesday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      wednesday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      thursday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      friday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      saturday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      sunday: {
        date: "2023-01-03",
        hours: 6,
        shifts: [{
          start: "2023-01-03T10:00:00.000Z",
          end: "2023-01-03T16:00:00.000Z"
        }],
        is_public_holiday: false,
        rate: 50
      },
      
    },
    weeklyHours: 40,
    weeklyAmount: 2000,
    status: "unpaid",
    notes: "Additional notes here"
  }) {
    id
    invoiceNumber
    issueDate
    dueDate
    startOfWeek
    days {
      monday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      tuesday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      wednesday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      thursday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      friday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      saturday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
      sunday {
        date
        hours
        shifts {
          start
          end
        }
        is_public_holiday
        rate
      }
    }
    weeklyHours
    weeklyAmount
    status
    notes
  }
}
