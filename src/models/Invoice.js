const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const daySchema = new Schema({
  amount: Number,
  date: Date,
  hours: Number,
  shifts: [shiftSchema],
  is_public_holiday: Boolean,
  rate: Number,
});

// Pre-save middleware to calculate hours
daySchema.pre("save", function (next) {
  if (this.shifts && this.shifts.length > 0) {
    const totalHours = this.shifts.reduce((acc, shift) => {
      const start = new Date(shift.start);
      const end = new Date(shift.end);
      const duration = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
      return acc + duration;
    }, 0);

    this.hours = totalHours;
  }
  next();
});

const invoiceSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    invoiceNumber: {
      type: Number,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    startOfWeek: {
      type: Date,
      required: true,
    },
    days: {
      monday: daySchema,
      tuesday: daySchema,
      wednesday: daySchema,
      thursday: daySchema,
      friday: daySchema,
      saturday: daySchema,
      sunday: daySchema,
    },
    weeklyHours: Number,
    weeklyAmount: Number,
    status: {
      type: String,
      required: true,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
    notes: String, // Optional field for any additional notes
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Pre-save middleware to calculate weeklyHours and weeklyAmount
invoiceSchema.pre("save", function (next) {
  this.weeklyHours = 0;
  this.weeklyAmount = 0;

  // Check if `this.days` is defined and is an object
  if (this.days && typeof this.days === "object") {
    Object.values(this.days).forEach((day) => {
      // Check if `day` is defined and has the `hours` and `amount` properties
      if (day && day.hours && day.amount) {
        this.weeklyHours += day.hours;
        this.weeklyAmount += day.amount;
      }
    });
  }

  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);
