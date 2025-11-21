export async function arxonRequest(
  endpoint: string,
  payload: any
) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "arxon-access-key": "Arxon_owner_281083"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err: any) {
    return {
      ok: false,
      data: { error: err.message || "Request failed." }
    };
  }
}
