import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckIcon, XIcon } from './Icons';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            minWidth: '280px',
            maxWidth: '380px',
            background: toast.type === 'success' ? '#22c55e' : '#ef4444',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {toast.type === 'success'
            ? <CheckIcon size={16} strokeWidth={2.5} />
            : <XIcon size={16} strokeWidth={2.5} />
          }
          <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0 0 0 4px',
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <XIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
