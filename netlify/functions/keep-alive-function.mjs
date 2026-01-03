export default async (req) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Supabase ping failed: ${response.status}`)
    }

    return new Response('Ok')
  } catch (error) {
    return new Error(error)
  }
}
