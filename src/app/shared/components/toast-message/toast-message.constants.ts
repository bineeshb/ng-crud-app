import { Message } from 'primeng/api';

export const TOAST_DEFAULTS: Message = {
  key: 'CRUDAppToast',
  life: 5000
};

export const TOAST_SEVERITIES = {
  success: 'success',
  error: 'error',
  warn: 'warn',
  info: 'info'
};
