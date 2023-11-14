import  { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { FIRESTORE } from '../firebase-config';
import { snarkdownEnhanced as snarkdown } from '../utils';

const markdownsCollection = collection(FIRESTORE, 'markdowns');
const markdownDoc = doc(markdownsCollection, 'ujXblCNlVM9R5E5rkDn3');

export const Editor = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [convertedMarkdown, setConvertedMarkdown] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(markdownDoc, snapshot => {
      const data = snapshot.data();
      if (data && data.markdown) {
        setMarkdown(data.markdown);
      }
    });

    return () => unsubscribe();
  }, []);

  // Función de debounce
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Función convert envuelta en debounce
  const debouncedConvert = useCallback(debounce((value) => {
    const converted = snarkdown(value);
    setConvertedMarkdown(converted);
    setDoc(markdownDoc, { converted, markdown: value });
  }, 500), []); // 500 ms de retraso

  const handleInputChange = (event) => {
    const value = event.target.value;
    setMarkdown(value);
    debouncedConvert(value);
  };

  return (
    <>
      <h3>Editor</h3>
      <div id="editor">
        <textarea onChange={handleInputChange} value={markdown}></textarea>
        <div className="output" dangerouslySetInnerHTML={{ __html: convertedMarkdown }}></div>
      </div>
    </>
  );
};
