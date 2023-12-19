import useTokenData from '@/services/auth/token-data-loader';
import { addMonths } from 'date-fns';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
type ButtonWrapperProps = {
    currency: any;
    showSpinner: boolean;
    amount: string;
    type: number;
    months: number;
    onSuccess: () => void;
};
// Custom component to wrap the PayPalButtons and show a loading spinner
const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
    currency,
    showSpinner,
    amount,
    type,
    months,
    onSuccess,
}) => {
    let token: string | null;

    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({ type: 'resetOptions', value: { ...options, currency: currency } });
    }, [currency, showSpinner]);

    const idUser = useTokenData()?.userID;
    const pay_day: Date = new Date();
    const expiration_date: Date = addMonths(pay_day, months);

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                disabled={Number(amount) === 0}
                forceReRender={[currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: 'USD', value: amount } }],
                        })
                        .then((orderId) => orderId)
                }
                onApprove={
                    (data, actions) =>
                        actions.order
                            ? actions.order
                                  .capture()
                                  .then(async (response) => {
                                      const apiPayload = {
                                          paymentResponse: response,
                                          id: idUser,
                                          account_type: type,
                                          number_month: months,
                                          pay_day: pay_day,
                                          expiration_date: expiration_date,
                                          total: amount,
                                      };
                                      fetch(`${process.env.NEXT_PUBLIC_API_URL}/landlord/payment`, {
                                          method: 'PUT',
                                          headers: {
                                              ...(token && { Authorization: `Bearer ${token}` }),
                                              'Content-Type': 'application/json',
                                          },
                                          body: JSON.stringify(apiPayload),
                                      })
                                          .then((apiResponse) => {
                                              console.log('API Response:', apiResponse);
                                              onSuccess();
                                          })
                                          .catch((apiError) =>
                                              console.error('API Error:', apiError)
                                          );
                                  })
                                  .catch((error) => {
                                      console.error('Error capturing the payment:', error);
                                  })
                            : Promise.resolve() // Return a resolved promise if actions.order is undefined
                }
            />
        </>
    );
};
interface PaypalProps {
    amount: string;
    type: number;
    months: number;
}
export default function Paypal({ amount, type, months }: PaypalProps) {
    const [open, setOpen] = React.useState(false); // State to manage Snackbar visibility

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider
                options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}
            >
                <ButtonWrapper
                    currency={'USD'}
                    amount={amount}
                    showSpinner={false}
                    type={type}
                    months={months}
                    onSuccess={() => setOpen(true)}
                />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%', background: '#11640b', color: '#fff' }}
                    >
                        Thanh toán thành công.
                    </Alert>
                </Snackbar>
            </PayPalScriptProvider>
        </div>
    );
}
