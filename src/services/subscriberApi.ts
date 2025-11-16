import api from "./api";

/**
 * Check if subscriber email already exists.
 */
export async function checkSubscriber(email: string) {
  const res = await api.get("/subscribers", {
    params: {
      "filters[email][$eq]": email,
    },
  });

  return res.data?.data ?? [];
}

/**
 * Add new subscriber email.
 */
export async function addSubscriber(email: string) {
  const res = await api.post("/subscribers", {
    data: { email },
  });

  return res.data;
}
