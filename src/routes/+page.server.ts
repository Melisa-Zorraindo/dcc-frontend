import { fail, type Actions } from '@sveltejs/kit';

type ApiBody = {
  success?: boolean;
  message?: string;
  statusCode?: number;
  errors?: Record<string, string>;
  data?: { key: string; email: string; createdAt: string };
};

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const email = data.get('email');

    // TODO: update server address
    const res = await fetch('http://localhost:8080/api/v1/keys', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    let body: ApiBody | null = null;
    const text = await res.text();
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = { message: text };
    }

    if (!res.ok) {
      return fail(res.status, {
        success: false,
        message: body?.message ?? 'Something went wrong',
        statusCode: body?.statusCode,
        errors: body?.errors
      });
    }

    return { success: true, key: body?.data?.key };
  }
} satisfies Actions;
