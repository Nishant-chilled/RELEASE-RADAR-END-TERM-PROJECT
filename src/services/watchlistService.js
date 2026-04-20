import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const WATCHLIST_COLLECTION = 'watchlists';

export async function getWatchlist(userId) {
  const watchlistQuery = query(
    collection(db, WATCHLIST_COLLECTION),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(watchlistQuery);

  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
}

export async function createWatchlistItem(item) {
  const payload = {
    ...item,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, WATCHLIST_COLLECTION), payload);

  return {
    id: docRef.id,
    ...item,
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
    updatedAt: { seconds: Math.floor(Date.now() / 1000) },
  };
}

export async function updateWatchlistItem(id, updates) {
  await updateDoc(doc(db, WATCHLIST_COLLECTION, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteWatchlistItem(id) {
  await deleteDoc(doc(db, WATCHLIST_COLLECTION, id));
}