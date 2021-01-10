import axios from 'axios';
import React, { useEffect, useState } from 'react';

const endpoint = 'http://localhost:8000/extract';

const getImportantText = (text: string | undefined) => {
  const [importantText, setImportantText] = useState<string[]>();

  useEffect(() => {
    if (!text) return;
    const fetchImportantText = async () => {
      const res = await axios.post(endpoint, { text: text });
      setImportantText(res.data.sentences);
    };

    fetchImportantText();
  }, [text]);

  return importantText;
};

export default getImportantText;
