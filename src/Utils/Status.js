// Defining a constant object named 'STATUS' using Object.freeze to make it immutable.
export const STATUS = Object.freeze({
  // Represents the idle state, indicating no ongoing operation.
  IDLE: 'IDLE',

  // Represents the failed state, indicating that an operation has encountered an error.
  FAILED: 'FAILED',

  // Represents the loading state, indicating that an operation is currently in progress.
  LOADING: 'LOADING',

  // Represents the succeeded state, indicating that an operation has been successfully completed.
  SUCCEEDED: 'SUCCEEDED'
});
