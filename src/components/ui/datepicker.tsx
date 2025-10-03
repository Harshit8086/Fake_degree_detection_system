// src/components/ui/datepicker.tsx
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleChange}
      placeholderText={placeholder}
      className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      dateFormat="yyyy-MM-dd"
    />
  );
};
