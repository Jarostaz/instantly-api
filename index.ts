const ping = () => {
  // fetch 
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  } as RequestInit;

  const API_KEY = process.env.INSTANTLY_API_KEY;

  if(!API_KEY) {
    throw new Error('INSTANTLY_API_KEY environment variable is undefined');
  }

  return fetch(`https://api.instantly.ai/api/v1/authenticate?api_key=${API_KEY}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const instantly = {
  ping
};

export default instantly;