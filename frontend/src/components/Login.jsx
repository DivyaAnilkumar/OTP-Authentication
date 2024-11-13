import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);

    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/otp/send-otp', { email });
            setStep(2); 
        } catch (error) {
            alert('Error sending OTP ');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/otp/verify-otp', { email, otp });
            if (response.data.message === 'OTP verified') {
                setStep(3); 
            }
        } catch (error) {
            alert('Invalid OTP');
        }
    };

    return (
        <Box
        sx={{
            backgroundColor: '#f0f4f8', 
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Container
                maxWidth="sm"
                sx={{
                    textAlign: 'center',
                    py: 5,
                    backgroundColor: 'white', 
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
            {step === 1 && (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Enter your Email
                    </Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={sendOtp}
                    >
                        Submit
                    </Button>
                </Box>
            )}
            {step === 2 && (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Enter OTP
                    </Typography>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={verifyOtp}
                    >
                        Submit
                    </Button>
                </Box>
            )}
            {step === 3 && (
                <Typography variant="h4" sx={{ color: '#003366' }} gutterBottom>
                    Welcome to the site!
                </Typography>
            )}
        </Container>
        </Box>
    );
}

export default Login;
