
'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
  Query,
  DocumentData,
  FirestoreError,
  QueryConstraint,
  collectionGroup,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export interface UseCollectionOptions {
  constraints?: QueryConstraint[];
  isCollectionGroup?: boolean;
}

export function useCollection<T>(
  path: string,
  options?: UseCollectionOptions
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore) return;

    const collectionRef = options?.isCollectionGroup
      ? collectionGroup(firestore, path)
      : collection(firestore, path);
    const q = options?.constraints
      ? query(collectionRef, ...options.constraints)
      : collectionRef;

    const unsubscribe = onSnapshot(
      q as Query<DocumentData>,
      (snapshot) => {
        const result: T[] = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(result);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
            path: path,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [firestore, path, JSON.stringify(options)]);

  return { data, loading, error };
}
