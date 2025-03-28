import type { SnackbarOrigin, SnackbarCloseReason } from "@mui/material";

export type ToastContextProps = {
  toast: ToastProps;
  showToast: (toast: ToastProps) => void;
  hideToast: (_?: React.SyntheticEvent<unknown> | Event, reason?: SnackbarCloseReason) => void;
};

export type ToastProps = {
  duration?: number;
  text: string;
  isVisible?: boolean;
  persistent?: boolean;
  cancelable?: boolean;
  type?: ToastType;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number | null;
};

export type ToastProviderProps = {
  children: React.ReactNode;
};

export type ToastType = "success" | "info" | "warning" | "error";
