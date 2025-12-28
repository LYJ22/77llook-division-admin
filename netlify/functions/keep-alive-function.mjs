export default async (req) => {
  try {
    const response = await fetch(`${import.meta.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: import.meta.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.SUPABASE_ANON_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Supabase ping failed: ${response.status}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        timestamp: new Date().toISOString(),
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: error.message,
      }),
    }
  }

  // const { next_run } = await req.json()

  // console.log("Received event! Next invocation at:", next_run)
}
