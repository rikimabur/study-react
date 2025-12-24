export const ORDER_STATUS = {
  CONFIRMED: "Confirmed",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.CONFIRMED,
    label: ORDER_STATUS.CONFIRMED,
    color: "warning",
  },
  {
    value: ORDER_STATUS.READY_FOR_PICKUP,
    label: ORDER_STATUS.READY_FOR_PICKUP,
    color: "info",
  },
  {
    value: ORDER_STATUS.COMPLETED,
    label: ORDER_STATUS.COMPLETED,
    color: "success",
  },
  {
    value: ORDER_STATUS.CANCELLED,
    label: ORDER_STATUS.CANCELLED,
    color: "danger",
  },
];
