import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import favicon from '../../assets/images/icons/favicon.png';
import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(formData);
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
              Sign up
            </Typography>

            <form onSubmit={onFormSubmit}>
              <Grid
                container
                alignItems='center'
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    label='First Name'
                    name='firstName'
                    value={formData.firstName}
                    autoFocus
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    value={formData.lastName}
                    autoFocus
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    label='Email Address'
                    value={formData.email}
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    onChange={onInputChange}
                    value={formData.password}
                    autoComplete='current-password'
                  />
                </Grid>
              </Grid>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                size='large'
              >
                Sign Up
              </Button>

              <MuiLink component={Link} to='/login' variant='body2'>
                Already have an account? Sign In
              </MuiLink>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
