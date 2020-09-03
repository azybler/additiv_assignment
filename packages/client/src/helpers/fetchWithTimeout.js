const fetchWithTimeout = (url, timeout) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => resolve(res))
      .catch((ex) => reject(ex));
    setTimeout(() => reject(new Error('timeout')), timeout);
  });
};

export default fetchWithTimeout;
