
'use client';

import React, { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

export const FirebaseErrorListener = () => {
  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // The Next.js development overlay will pick this up
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
};
