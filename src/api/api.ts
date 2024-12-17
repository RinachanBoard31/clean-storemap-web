async function sendPutRequest<T extends { [key: string]: unknown }>(
  url: string,
  { arg }: { arg: T }
) {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    throw new Error(`RequestFailed: url:${url} status:${response.status}`);
  }
}

async function sendGetRequest(url: string) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    console.error(`RequestFailed: url:${url} status:${response.status}`);
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  return await response.json();
}

async function sendPostRequest<
  T extends {
    [key: string]: unknown;
  }
>(
  url: string,
  {
    arg,
  }: {
    arg: T;
  }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`RequestFailed: url:${url} status:${response.status}`);
  }
  return await response.json();
}

export default {
  sendPutRequest,
  sendGetRequest,
  sendPostRequest,
};
