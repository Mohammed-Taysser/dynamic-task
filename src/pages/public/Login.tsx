import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import usePageTitle from '../../hooks/usePageTitle';
import {
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useRedux';
import { login } from '../../redux/slices/auth';
import { Alert } from '@mui/material';
import Button from '../../components/Button';

function Login() {
  usePageTitle('Sign In');
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const loginState = useAppSelector(selectAuth);
  const [formData, setFormData] = useState<LoginBodyState>({
    email: '',
    password: '',
  });

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login(formData)).then((action) => {
      if (login.fulfilled.match(action)) {
        navigateTo('/');
      }
    });
  };

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <Container>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: '100vh' }}
      >
        <Grid item sm={6} md={4}>
          <Box textAlign='center'>
            <Avatar src={favicon} sx={{ width: 80, height: 80, mx: 'auto' }} />

            <Typography component='h1' variant='h5' mt={1} mb={3}>
              Sign in
            </Typography>

            <form onSubmit={onFormSubmit}>
              <TextField
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                value={formData.email}
                autoFocus
                onChange={onInputChange}
              />

              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={formData.password}
                onChange={onInputChange}
                autoComplete='current-password'
              />

              {loginState.error && (
                <Alert severity='error' sx={{ textAlign: 'left' }}>
                  {loginState.error}
                </Alert>
              )}

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                isLoading={loginState.status === 'loading'}
                size='large'
              >
                Sign In
              </Button>

              <MuiLink component={Link} to='/register' variant='body2'>
                Don't have an account? Sign Up
              </MuiLink>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
