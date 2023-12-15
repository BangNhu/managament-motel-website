export const checkToken = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data;
        } else {
            throw new Error('Failed to check token');
        }
    } catch (error: any) {
        throw new Error('Error checking token: ' + error.message);
    }
};

export const getTokenData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }

        const data = await checkToken(token);
        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        return null;
    }
};
