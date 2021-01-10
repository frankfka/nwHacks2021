import axios from 'axios';

const endpoint = 'http://localhost:8000/text-to-speech';

const getTextToSpeech = async (text: string) => {
  const res = await axios.post(
    endpoint,
    { text },
    {
      responseType: 'blob',
    }
  );

  console.log(res);

  return { data: res.data, contentType: res.headers['content-type'] };
};

export default getTextToSpeech;
